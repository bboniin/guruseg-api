import prismaClient from "../../prisma";

interface AssociateRequest {
  userId: string;
}

class GetAssociateService {
  async execute({ userId }: AssociateRequest) {
    const associate = await prismaClient.associate.findUnique({
      where: {
        id: userId,
      },
    });

    return associate;
  }
}

export { GetAssociateService };
