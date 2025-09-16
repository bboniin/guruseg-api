import prismaClient from "../../prisma";

interface OrderRequest {
  id: number;
}

class CancelOrderService {
  async execute({ id }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
      },
    });

    if (order.collaborator_id) {
      throw new Error(
        "Ordem de serviço já está em andamento, não sendo possivel mais a exclusão."
      );
    }

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: "cancelado",
      },
      include: {
        items: true,
        messages: true,
      },
    });

    orderD["totalServices"] = order.urgent ? 1 : 0;
    orderD["totalValue"] = order.urgent ? 147 : 0;

    orderD.items.map((item) => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });

    if (order.payment_id) {
      const user = await prismaClient.user.findUnique({
        where: {
          id: orderD.user_id,
        },
      });

      const payment = await prismaClient.payment.update({
        where: {
          id: order.payment_id,
        },
        data: {
          status: "cancelado",
        },
      });

      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          balance: parseFloat((user.balance + payment.value).toFixed(2)),
        },
      });
    }

    return orderD;
  }
}

export { CancelOrderService };
