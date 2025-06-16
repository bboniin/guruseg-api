import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface moduleRequest {
  name: string;
  userId: string;
  description: string;
  id: string;
  restricted: boolean;
  order: string;
}

class EditModuleService {
  async execute({
    name,
    description,
    restricted,
    userId,
    order,
    id,
  }: moduleRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const module = await prismaClient.module.findUnique({
      where: {
        id: id,
      },
    });

    if (!name) {
      throw new Error("Nome do Modulo e descroção são obrigatórios");
    }

    if (!module) {
      throw new Error("Modulo não existe");
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    let data = {
      name: name,
      restricted: restricted,
      description: description,
      order: orderC,
    };

    const moduleRes = await prismaClient.module.update({
      where: {
        id: id,
      },
      data: data,
    });

    return moduleRes;
  }
}

export { EditModuleService };
