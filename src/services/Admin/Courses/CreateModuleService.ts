import prismaClient from "../../../prisma";

interface ModuleRequest {
  name: string;
  userId: string;
  order: string;
  description: string;
  restricted: boolean;
}

class CreateModuleService {
  async execute({
    userId,
    name,
    restricted,
    order,
    description,
  }: ModuleRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!name || !description) {
      throw new Error("Nome do Modulo e descroção são obrigatórios");
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    const moduleRes = await prismaClient.module.create({
      data: {
        name: name,
        description: description,
        order: orderC,
        restricted: restricted,
      },
    });

    return moduleRes;
  }
}

export { CreateModuleService };
