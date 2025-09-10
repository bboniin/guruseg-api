import { api } from "../../config/api";
import prismaClient from "../../prisma";

interface PaymentRequest {
  payment_id: string;
  userId: string;
}

class GetPaymentService {
  async execute({ payment_id, userId }: PaymentRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    const payment = await prismaClient.payment.findUnique({
      where: {
        id: payment_id,
      },
    });

    if (!admin && payment.user_id != userId) {
      throw new Error("Pagamento não encontrado");
    }

    let paymentResponse = payment;

    if (payment.asaas_id) {
      await api
        .get(`/payments/${payment.asaas_id}/pixQrCode`)
        .then(async (res) => {
          paymentResponse["pix"] = res.data;
        })
        .catch((e) => {
          throw new Error("Ocorreu um gerar QR Code Pix, recarregue a página");
        });
    }

    return paymentResponse;
  }
}

export { GetPaymentService };
