import { api } from "../../config/api";
import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

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
        enterprise: true,
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

    const s3Storage = new S3Storage();
    if (orderD.user.photo) {
      orderD.user["photo_url"] = await s3Storage.getTemporaryUrl(
        orderD.user.photo,
        245,
      );
    }
    if (orderD.collaborator?.photo) {
      orderD.collaborator["photo_url"] = await s3Storage.getTemporaryUrl(
        orderD.collaborator.photo,
        245,
      );
    }
    const docsResponse = await Promise.all(
      orderD.docs.map(async (file) => {
        file["file_url"] = await s3Storage.getTemporaryUrl(file.file, 245);
        file["fileName"] = String(file.file).substr(33);

        return file;
      }),
    );
    return {
      ...orderD,
      docs: docsResponse,
    };
  }
}

export { EditOrderService };
