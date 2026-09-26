import prismaClient from "../../prisma";

class ListAdminOrdersUrgentService {
  async execute() {
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
        enterprise: true,
      },
    });

    return {
      orders: orders,
      ordersTotal: ordersTotal.length,
    };
  }
}

export { ListAdminOrdersUrgentService };
