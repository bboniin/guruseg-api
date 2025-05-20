import prismaClient from "../../prisma";

interface OrderRequest {
  id: number;
  userId: string;
  collaborator_id: string;
}

class EditCollaboratorOrderService {
  async execute({ id, userId, collaborator_id }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error("Ordem de serviço não encontrada");
    }

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        collaborator_id: collaborator_id,
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

export { EditCollaboratorOrderService };
