import api from "../../config/api";
import prismaClient from "../../prisma";

interface OrderRequest {
  userId: string;
  id: number;
}

class GetOrderService {
  async execute({ userId, id }: OrderRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        photo: true,
      },
    });

    const collaborator = await prismaClient.collaborator.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        photo: true,
      },
    });

    const order = await prismaClient.order.findFirst({
      where: {
        id: id,
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

    if (order.redemptions[0]) {
      order["redemption"] = order.redemptions[0];
    }

    delete order.redemptions;

    if (!order) {
      throw new Error("Ordem de serviço não foi encontrada");
    }

    order["totalServices"] = 0;
    order["totalValue"] = 0;

    order.items.map((item) => {
      order["totalServices"] += item.amount;
      order["totalValue"] += item.value * item.amount;
    });

    if (user) {
      if (userId != order.user.id) {
        throw new Error("Essa ordem de serviço não está vinculada a sua conta");
      }
    } else {
      if (collaborator) {
        if (order.collaborator) {
          if (userId != order.collaborator.id) {
            throw new Error(
              "Essa ordem de serviço não está vinculada a sua conta"
            );
          }
        }
      }
    }

    order.docs.map((item) => {
      item["fileName"] = String(item.file).substr(33);
    });

    if (user) {
      if (order.payment_id && order.status_payment == "pendente") {
        await api
          .get(`/payments/${order.payment.asaas_id}/pixQrCode`)
          .then(async (res) => {
            order["pix"] = res.data;
          })
          .catch((e) => {
            throw new Error(
              "Ocorreu um gerar QR Code Pix, recarregue a página"
            );
          });
      }
    }

    return order;
  }
}

export { GetOrderService };
