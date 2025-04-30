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
      },
    });

    orderD["totalServices"] = 0;
    orderD["totalValue"] = 0;

    orderD.items.map((item) => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });

    return orderD;
  }
}

export { CancelOrderService };
