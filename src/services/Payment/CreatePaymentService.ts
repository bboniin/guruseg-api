import { addDays, format } from "date-fns";
import api from "../../config/api";
import prismaClient from "../../prisma";

interface PaymentRequest {
  order_id: number;
  userId: string;
}
class CreatePaymentService {
  async execute({ order_id, userId }: PaymentRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
        type: "cliente",
      },
    });
    if (!user) {
      throw new Error("Franqueado não encontrado");
    }

    if (!user.costumer_id) {
      throw new Error("Franqueado não cadastrou CPF para nota fiscal");
    }

    const order = await prismaClient.order.findFirst({
      where: {
        id: order_id,
        user_id: userId,
      },
      include: {
        items: {
          orderBy: {
            create_at: "asc",
          },
        },
        docs: {
          orderBy: {
            create_at: "asc",
          },
        },
        payment: true,
        user: true,
        collaborator: true,
      },
    });

    if (!order) {
      throw new Error("OS não encontrada");
    }

    if (order.payment_id) {
      if (order.status_payment == "confirmado") {
        throw new Error("Ordem de serviço com pagamento já realizado");
      }
      if (order.status_payment == "pendente") {
        throw new Error("Ordem de serviço com pagamento gerado");
      }
    }

    let totalOrder = 0;
    order.items.map((item) => {
      totalOrder += item.amount * item.value;
    });

    if (totalOrder < 5) {
      throw new Error("Valor minimo para gerar cobrança é de R$ 5,00");
    }

    let orderPayment = {};

    await api
      .post("/payments", {
        value: totalOrder,
        billingType: "PIX",
        customer: user.costumer_id,
        dueDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
      })
      .then(async (response) => {
        const payment = await prismaClient.payment.create({
          data: {
            asaas_id: response.data.id,
            value: totalOrder,
            order_id: order.id,
            status: "pendente",
          },
        });

        orderPayment = await prismaClient.order.update({
          where: {
            id: order.id,
          },
          data: {
            status_payment: "pendente",
            payment_id: payment.id,
          },
          include: {
            items: {
              orderBy: {
                create_at: "asc",
              },
            },
            docs: {
              orderBy: {
                create_at: "asc",
              },
            },
            payment: true,
            user: true,
            collaborator: true,
          },
        });

        await api
          .get(`/payments/${response.data.id}/pixQrCode`)
          .then(async (res) => {
            orderPayment["pix"] = res.data;
          })
          .catch((e) => {
            throw new Error(
              "Ocorreu um gerar QR Code Pix, recarregue a página"
            );
          });
      })
      .catch((e) => {
        throw new Error("Ocorreu um erro ao criar cobrança");
      });
    return orderPayment;
  }
}

export { CreatePaymentService };
