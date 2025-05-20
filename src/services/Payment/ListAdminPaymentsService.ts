import prismaClient from "../../prisma";

interface PaymentRequest {
  userId: string;
  order_id: number;
  search: string;
  page: number;
}

class ListAdminPaymentsService {
  async execute({ userId, page, order_id, search }: PaymentRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const paymentsTotal = await prismaClient.payment.findMany({
      /*   where: {
        orders: {
          some: order_id
            ? {
                id: order_id,
                user: {
                  name: { contains: search },
                },
              }
            : {
                user: {
                  name: { contains: search },
                },
              },
        },
      },*/
    });

    const payments = await prismaClient.payment.findMany({
      /* where: {
        orders: {
          some: order_id
            ? {
                id: order_id,
                user: {
                  name: { contains: search },
                },
              }
            : {
                user: {
                  name: { contains: search },
                },
              },
        },
      },*/
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc",
      },
    });

    const totalValue = paymentsTotal.reduce(
      (sum, transaction) => sum + transaction.value,
      0
    );

    return { payments, paymentsTotal: paymentsTotal.length, totalValue };
  }
}

export { ListAdminPaymentsService };
