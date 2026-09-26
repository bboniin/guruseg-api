import prismaClient from "../../../prisma";

interface UserMatrizRequest {
  id: string;
}

class DeleteUserMatrizService {
  async execute({ id }: UserMatrizRequest) {
    const service = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        visible: false,
        email: id,
      },
    });
    return service;
  }
}

export { DeleteUserMatrizService };
