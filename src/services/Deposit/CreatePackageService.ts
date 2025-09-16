import prismaClient from "../../prisma";

interface PackageRequest {
  description: string;
  name: string;
  userId: string;
  value: number;
  bonus: number;
  type: string;
}

class CreatePackageService {
  async execute({
    description,
    type,
    userId,
    name,
    value,
    bonus,
  }: PackageRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!name || !value) {
      throw new Error("Preencha o nome e valor do pacote de deposito");
    }

    const deposit = await prismaClient.depositPackage.create({
      data: {
        description,
        name,
        value,
        type,
        bonus: bonus || 0,
      },
    });

    return deposit;
  }
}

export { CreatePackageService };
