import prismaClient from "../../prisma";

interface PaymentRequest {
  userId: string;
  page: number;
}

class ListAssociatePaymentsService {
  async execute({ userId, page }: PaymentRequest) {
    const paymentsTotalArray = await prismaClient.associatePayment.findMany({
      where: {
        associate_id: userId,
      },
    });

    const payments = await prismaClient.associatePayment.findMany({
      where: {
        associate_id: userId,
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc",
      },
    });

    const paymentsTotalValue = paymentsTotalArray.reduce((acc, payment) => {
      return acc + payment.value;
    }, 0);

    const paymentsTotal = paymentsTotalArray.length;

    return { payments, paymentsTotal, paymentsTotalValue };
  }
}

export { ListAssociatePaymentsService };
