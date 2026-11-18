"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddUrgentOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _resend = require("resend");
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AddUrgentOrderService {
  async execute({
    id,
    userId
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      },
      include: {
        user: true
      }
    });
    if (!order) {
      throw new Error("Ordem de serviço já excluida.");
    }
    const user = await _prisma.default.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    if (147 > user.balance) {
      throw new Error("Saldo insuficiente para solicitar esse serviço");
    }
    const path = (0, _path.resolve)(__dirname, "..", "..", "views", "acceptOS.hbs");
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
    const templateParse = _handlebars.default.compile(templateFileContent);
    const templateHTML = templateParse({
      id: order.id,
      name: order.user.name
    });
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    await resend.emails.send({
      from: "Equipe Guruseg <noreply@gurusegead.com.br>",
      to: order.user.email,
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTML
    });
    const paymentGet = await _prisma.default.payment.findFirst({
      where: {
        order_id: order.id
      }
    });
    if (!user) {
      throw new Error("Erro ao processar pagamento");
    }
    const payment = await _prisma.default.payment.update({
      where: {
        id: paymentGet.id
      },
      data: {
        value: paymentGet.value + 147
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
        balance: user.balance - 147
      }
    });
    await _prisma.default.item.create({
      data: {
        amount: 1,
        order_id: order.id,
        name: "Taxa de Urgência",
        value: 147,
        commission: 14.7,
        description: "OS finalizada de acordo com prazo selecionado"
      }
    });
    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        update_at: new Date(),
        delivery_time: 1,
        delivery_date: (0, _dateFns.addDays)(new Date(), 1),
        urgent: true
      },
      include: {
        items: true,
        messages: true,
        enterprise: true
      }
    });
    orderD["totalServices"] = 0;
    orderD["totalValue"] = 0;
    orderD.items.map(item => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });
    return orderD;
  }
}
exports.AddUrgentOrderService = AddUrgentOrderService;