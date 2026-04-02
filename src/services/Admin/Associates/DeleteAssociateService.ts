import prismaClient from "../../../prisma";

interface AssociateRequest {
  id: string;
}

class DeleteAssociateService {
  async execute({ id }: AssociateRequest) {
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
