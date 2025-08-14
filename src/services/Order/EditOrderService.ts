import { api } from "../../config/api";
import prismaClient from "../../prisma";

interface OrderRequest {
  id: number;
  userId: string;
  observation: string;
  company_id: string;
}

class EditOrderService {
  async execute({ id, userId, observation, company_id }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error("Ordem de serviço não encontrada");
    }

    const orderD = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        observation: userId == order.user_id ? observation : order.observation,
        observationCollaborator:
          userId != order.user_id ? observation : order.observationCollaborator,
        company_id: userId == order.user_id ? company_id : order.company_id,
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
        messages: true,
        redemptions: true,
      },
    });

    if (userId == order.user_id) {
      if (company_id != order.company_id) {
        if (order.company_id) {
          await prismaClient.company.update({
            where: {
              id: order.company_id,
            },
            data: {
              order_id: 0,
            },
          });
        }

        if (company_id) {
          await prismaClient.company.update({
            where: {
              id: company_id,
            },
            data: {
              order_id: order.id,
            },
          });
        }
      }
    }

    orderD["totalServices"] = 0;
    orderD["totalValue"] = 0;

    orderD.items.map((item) => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });

    if (userId == orderD.user_id) {
      if (orderD.payment_id && orderD.status_payment == "pendente") {
        await api
          .get(`/payments/${orderD.payment.asaas_id}/pixQrCode`)
          .then(async (res) => {
            orderD["pix"] = res.data;
          })
          .catch((e) => {
            throw new Error(
              "Ocorreu um gerar QR Code Pix, recarregue a página"
            );
          });
      }
    }

    return orderD;
  }
}

export { EditOrderService };
