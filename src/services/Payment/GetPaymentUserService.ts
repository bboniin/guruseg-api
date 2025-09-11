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

    const leads = await prismaClient.leadMaster.updateMany({
      where: {
        price: 45,
      },
      data: {
        price: 19.9,
      },
    });
    await Promise.all(
      payments.map(async (data) => {
        if (data.orders.length) {
          await prismaClient.payment.update({
            where: {
              id: data.id,
            },
            data: {
              user_id: data.orders[0].user_id,
            },
          });
        } else {
          const order = await prismaClient.order.findUnique({
            where: {
              id: data.order_id,
            },
          });

          await prismaClient.payment.update({
            where: {
              id: data.id,
            },
            data: {
              user_id: order.user_id,
            },
          });
        }
      })
    );

    return payments;
  }
}

export { GetPaymentUserService };
