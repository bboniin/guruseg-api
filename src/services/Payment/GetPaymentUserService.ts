import prismaClient from "../../prisma";

class GetPaymentUserService {
  async execute() {
    const payments = await prismaClient.payment.findMany({
      where: {
        user_id: null,
      },
      include: {
        orders: true,
      },
    });

    await Promise.all(
      payments.map(async (data) => {
        await prismaClient.payment.update({
          where: {
            id: data.id,
          },
          data: {
            user_id: data.orders[0].user_id,
          },
        });
      })
    );

    return payments;
  }
}

export { GetPaymentUserService };
