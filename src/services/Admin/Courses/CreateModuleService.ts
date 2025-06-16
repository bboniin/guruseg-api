import prismaClient from "../../../prisma";

interface ModuleRequest {
  name: string;
  userId: string;
  order: string;
  restricted: boolean;
  description: string;
}

class CreateModuleService {
  async execute({
    userId,
    name,
    order,
    restricted,
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
        restricted: restricted,
        order: orderC,
      },
    });

    return moduleRes;
  }
}

export { CreateModuleService };
