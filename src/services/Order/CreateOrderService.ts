import { format } from "date-fns";
import prismaClient from "../../prisma";
import { GetCouponService } from "../Coupon/GetCouponService";
import { RescueCouponService } from "../Coupon/RescueCouponService";

interface OrderRequest {
  observation: string;
  userId: string;
  name: string;
  company_id: string;
  urgent: boolean;
  sector: string;
  code: string;
  collaborators: number;
  items: Array<[]>;
}

class CreateOrderService {
  async execute({
    observation,
    userId,
    name,
    items,
    sector,
    urgent,
    company_id,
    collaborators,
    code,
  }: OrderRequest) {
    if (items.length == 0 || !userId || !sector || !collaborators) {
      throw new Error("Preencha todos os campos.");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
        type: "cliente",
      },
    });

    if (!user) {
      throw new Error("Franqueado não encontrado");
    }

    let totalValue = urgent ? 147 : 0;
    let totalServices = urgent ? 1 : 0;

    await Promise.all(
      await items.map(async (data) => {
        totalValue += data["value"] * data["amount"];
        totalServices += data["amount"];
      })
    );

    if (!code && totalValue > user.balance) {
      throw new Error("Saldo insuficiente para solicatar esses serviços");
    }

    let coupon = null;
    let valueDiscount = 0;

    if (code) {
      const getCouponService = new GetCouponService();

      coupon = await getCouponService.execute({
        code,
        userId,
        value: totalValue,
      });

      if (coupon.type == "FIXED") {
        valueDiscount = coupon.value;
      } else {
        valueDiscount = totalValue * (coupon.value / 100);
      }

      totalValue -= valueDiscount;

      if (totalValue > user.balance) {
        throw new Error("Saldo insuficiente para solicatar esses serviços");
      }
    }

    const order = await prismaClient.order.create({
      data: {
        observation: observation,
        user_id: userId,
        month: format(new Date(), "yyyy-MM"),
        name: name,
        company_id: company_id,
        sector: sector,
        urgent: urgent,
        collaborators: collaborators,
        status: "pendente",
        status_payment: "confirmado",
      },
      include: {
        user: true,
      },
    });

    if (coupon) {
      const rescueCouponService = new RescueCouponService();

      await rescueCouponService.execute({
        coupon,
        userId,
        orderId: order.id,
        value: valueDiscount,
      });
    }

    const payment = await prismaClient.payment.create({
      data: {
        value: totalValue,
        order_id: order.id,
        status: "confirmado",
        user_id: userId,
        type: "OS",
        method: "SALDO",
      },
    });

    await prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        payment_id: payment.id,
      },
    });

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        balance: parseFloat((user.balance - totalValue).toFixed(2)),
      },
    });

    if (company_id) {
      await prismaClient.company.update({
        where: {
          id: company_id,
        },
        data: {
          order_id: order.id,
        },
      });
    }

    order["items"] = [];

    await Promise.all(
      await items.map(async (data) => {
        const itemOrder = await prismaClient.item.create({
          data: {
            amount: data["amount"],
            order_id: order.id,
            name: data["name"],
            value: data["value"],
            commission: data["commission"],
            description: data["description"],
          },
        });
        order["items"].push(itemOrder);
      })
    );

    if (urgent) {
      const itemOrder = await prismaClient.item.create({
        data: {
          amount: 1,
          order_id: order.id,
          name: "Taxa de Urgencia",
          value: 147,
          commission: 14.7,
          description: "OS finalizada em menos de 24hrs",
        },
      });
      order["items"].push(itemOrder);
    }

    order["totalValue"] = totalValue;
    order["totalServices"] = totalServices;

    return order;
  }
}

export { CreateOrderService };
