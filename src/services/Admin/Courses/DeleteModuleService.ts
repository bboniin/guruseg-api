import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface ModuleRequest {
  id: string;
}

class DeleteModuleService {
  async execute({ id }: ModuleRequest) {
    const module = await prismaClient.module.delete({
      where: {
        id: id,
      },
    });

    return module;
  }
}

export { DeleteModuleService };
