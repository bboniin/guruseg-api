import prismaClient from "../../../prisma";

interface PaymentRequest {
  associate_id: string;
  page: number;
}

class ListAdminAssociatePaymentsService {
  async execute({ page, associate_id }: PaymentRequest) {
    const paymentsTotalArray = await prismaClient.associatePayment.findMany({
      where: {
        associate_id: associate_id,
      },
    });

    const payments = await prismaClient.associatePayment.findMany({
      where: {
        associate_id: associate_id,
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

export { ListAdminAssociatePaymentsService };
