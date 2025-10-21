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

    await prismaClient.leadMaster.updateMany({
      where: {
        price: 19.9,
      },
      data: {
        price: 1.97,
      },
    });

    return payments;
  }
}

export { GetPaymentUserService };
