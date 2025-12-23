import prismaClient from "../../../prisma";

interface AdminRequest {
  id: string;
  userId: string;
}

class DeleteAdminService {
  async execute({ id, userId }: AdminRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad") {
      throw new Error("Rota restrita ao administrador master");
    }

    const adminDelete = await prismaClient.admin.delete({
      where: {
        id: id,
      },
    });

    return adminDelete;
  }
}

export { DeleteAdminService };
