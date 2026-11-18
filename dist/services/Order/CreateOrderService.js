"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _GetCouponService = require("../Coupon/GetCouponService");
var _RescueCouponService = require("../Coupon/RescueCouponService");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateOrderService {
  async execute({
    observation,
    userId,
    name,
    items,
    sector,
    company_id,
    collaborators,
    code,
    reminder,
    type,
    delivery_time,
    acquisition_channel,
    enterprise_id
  }) {
    if (items.length == 0 || !userId || !sector || !collaborators || !enterprise_id || !acquisition_channel) {
      throw new Error("Preencha todos os campos.");
    }
    const user = await _prisma.default.user.findFirst({
      where: {
        id: userId,
        type: "cliente"
      }
    });
    if (!user) {
      throw new Error("Franqueado não encontrado");
    }
    const final_delivery_time = delivery_time !== undefined ? Number(delivery_time) : 5;
    const urgencyPrices = {
      1: 147,
      2: 137,
      3: 127,
      4: 107,
      5: 0
    };
    let final_value_urgent = 0;
    if (sector === "Serviços de segurança do Trabalho") {
      final_value_urgent = urgencyPrices[final_delivery_time] ?? 0;
    }
    const final_urgent = final_value_urgent > 0;
    let calcDate = new Date();
    let addedDays = 0;
    while (addedDays < final_delivery_time) {
      calcDate.setDate(calcDate.getDate() + 1);
      const dayOfWeek = calcDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }
    const final_delivery_date = calcDate;
    let totalValue = final_urgent ? final_value_urgent : 0;
    let totalServices = final_urgent ? 1 : 0;
    await Promise.all(await items.map(async data => {
      totalValue += data["value"] * data["amount"];
      totalServices += data["amount"];
    }));
    if (!code && totalValue > user.balance) {
      throw new Error("Saldo insuficiente para solicitar esses serviços");
    }
    let coupon = null;
    let valueDiscount = 0;
    if (code) {
      const getCouponService = new _GetCouponService.GetCouponService();
      coupon = await getCouponService.execute({
        code,
        userId,
        value: totalValue
      });
      if (coupon.type == "FIXED") {
        valueDiscount = coupon.value;
      } else {
        valueDiscount = totalValue * (coupon.value / 100);
      }
      totalValue -= valueDiscount;
      if (totalValue > user.balance) {
        throw new Error("Saldo insuficiente para solicitar esses serviços");
      }
    }
    const order = await _prisma.default.order.create({
      data: {
        observation: observation,
        user_id: userId,
        month: (0, _dateFns.format)(new Date(), "yyyy-MM"),
        name: name,
        company_id: company_id,
        enterprise_id: enterprise_id,
        sector: sector,
        urgent: final_urgent,
        delivery_time: final_delivery_time,
        delivery_date: final_delivery_date,
        acquisition_channel: acquisition_channel,
        collaborators: collaborators,
        status: "pendente",
        type: type == "renovacao" ? "renovacao" : "elaboracao",
        status_payment: "confirmado"
      },
      include: {
        user: true
      }
    });
    if (coupon) {
      const rescueCouponService = new _RescueCouponService.RescueCouponService();
      await rescueCouponService.execute({
        coupon,
        userId,
        orderId: order.id,
        value: valueDiscount
      });
    }
    const payment = await _prisma.default.payment.create({
      data: {
        value: totalValue,
        order_id: order.id,
        status: "confirmado",
        user_id: userId,
        type: "OS",
        method: "SALDO"
      }
    });
    await _prisma.default.order.update({
      where: {
        id: order.id
      },
      data: {
        payment_id: payment.id
      }
    });
    await _prisma.default.user.update({
      where: {
        id: user.id
      },
      data: {
        balance: parseFloat((user.balance - totalValue).toFixed(2))
      }
    });
    if (company_id) {
      await _prisma.default.company.update({
        where: {
          id: company_id
        },
        data: {
          order_id: order.id
        }
      });
    }
    order["items"] = [];
    await Promise.all(await items.map(async data => {
      const itemOrder = await _prisma.default.item.create({
        data: {
          amount: data["amount"],
          order_id: order.id,
          name: data["name"],
          value: data["value"],
          commission: data["commission"],
          description: data["description"]
        }
      });
      order["items"].push(itemOrder);
    }));
    if (final_urgent) {
      const itemOrder = await _prisma.default.item.create({
        data: {
          amount: 1,
          order_id: order.id,
          name: "Taxa de Urgência",
          value: final_value_urgent,
          commission: final_value_urgent * 0.1,
          description: "OS finalizada de acordo com prazo selecionado"
        }
      });
      order["items"].push(itemOrder);
    }
    if (reminder) {
      await _prisma.default.reminder.create({
        data: {
          name: name,
          date: (0, _dateFns.addMonths)(new Date(), 9),
          description: "Lembrete para 3 meses antes para iniciar renovação da documentação dessa OS",
          type: "order",
          user_id: userId,
          order_id: order.id,
          expiration_date: (0, _dateFns.addMonths)(new Date(), 12),
          confirm: false
        }
      });
    }
    order["totalValue"] = totalValue;
    order["totalServices"] = totalServices;
    return order;
  }
}
exports.CreateOrderService = CreateOrderService;