import prismaClient from "../../../prisma";

interface ComissionRequest {
  associate_id: string;
  page: number;
}

class ListAdminAssociatePaymentsComissionService {
  async execute({ page, associate_id }: ComissionRequest) {
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

export { ListAdminAssociatePaymentsComissionService };
