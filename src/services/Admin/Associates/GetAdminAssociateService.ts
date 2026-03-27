import prismaClient from "../../../prisma";

interface AssociateRequest {
  id: string;
}

class GetAdminAssociateService {
  async execute({ id }: AssociateRequest) {
    const associate = await prismaClient.associate.findUnique({
      where: {
        id: id,
      },
      include: {
        leads: true,
        payments: true,
      },
    });

    return associate;
  }
}

export { GetAdminAssociateService };
