import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface ModuleRequest {
  userId: string;
  id: string;
}

class DeleteModuleService {
  async execute({ userId, id }: ModuleRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const module = await prismaClient.module.delete({
      where: {
        id: id,
      },
    });

    return module;
  }
}

export { DeleteModuleService };
