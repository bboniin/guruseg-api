import prismaClient from "../../prisma";

interface OrderRequest {
  userId: string;
}

class ListAdminOrdersUrgentService {
  async execute({ userId }: OrderRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const ordersTotal = await prismaClient.order.findMany({
      where: {
        urgent: true,
        status_payment: "confirmado",
        collaborator_id: null,
      },
    });

    const orders = await prismaClient.order.findMany({
      where: {
        urgent: true,
        status_payment: "confirmado",
        collaborator_id: null,
      },
      orderBy: {
        update_at: "desc",
      },
      include: {
        items: {
          orderBy: {
            create_at: "asc",
          },
        },
        user: true,
        collaborator: true,
      },
    });

    return {
      orders: orders,
      ordersTotal: ordersTotal.length,
    };
  }
}

export { ListAdminOrdersUrgentService };
