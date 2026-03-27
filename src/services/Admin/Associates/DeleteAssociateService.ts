import prismaClient from "../../../prisma";

interface AssociateRequest {
  id: string;
  userId: string;
}

class DeleteAssociateService {
  async execute({ id, userId }: AssociateRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const associate = await prismaClient.associate.update({
      where: {
        id: id,
      },
      data: {
        visible: false,
        email: id,
      },
    });

    return associate;
  }
}

export { DeleteAssociateService };
