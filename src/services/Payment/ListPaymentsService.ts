import prismaClient from "../../prisma";

interface PaymentRequest {
  userId: string;
  order_id: number;
  page: number;
}

class ListPaymentsService {
  async execute({ userId, page, order_id }: PaymentRequest) {
    const paymentsTotal = await prismaClient.payment.findMany({
      where: {
        orders: {
          some: order_id
            ? {
                id: order_id,
                user_id: userId,
              }
            : {
                user_id: userId,
              },
        },
      },
    });

    const payments = await prismaClient.payment.findMany({
      where: {
        orders: {
          some: order_id
            ? {
                id: order_id,
                user_id: userId,
              }
            : {
                user_id: userId,
              },
        },
      },
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

export { ListPaymentsService };
