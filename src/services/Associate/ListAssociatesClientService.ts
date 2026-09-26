import prismaClient from "../../prisma";

interface ComissionRequest {
  userId: string;
}

class ListAssociatesClientService {
  async execute({ userId }: ComissionRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Rota restrita para os franqueados");
    }

    const associates = await prismaClient.associate.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        create_at: "desc",
      },
    });

    return { associates };
  }
}

export { ListAssociatesClientService };
