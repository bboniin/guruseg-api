import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface OrderRequest {
  id: number;
  userId: string;
  collaborator_id: string;
}

class EditCollaboratorOrderService {
  async execute({ id, userId, collaborator_id }: OrderRequest) {
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
        collaborator_id: collaborator_id,
      },
      include: {
        collaborator: true,
        enterprise: true,
      },
    });

    const s3Storage = new S3Storage();
    if (orderD.collaborator?.photo) {
      orderD.collaborator["photo_url"] = await s3Storage.getTemporaryUrl(
        orderD.collaborator.photo,
        245,
      );
    }
    return orderD;
  }
}

export { EditCollaboratorOrderService };
