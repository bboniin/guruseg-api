import prismaClient from "../../prisma";

interface PackageRequest {
  id: string;
  description: string;
  name: string;
  userId: string;
  value: number;
  bonus: number;
}
class EditPackageService {
  async execute({
    id,
    userId,
    name,
    value,
    description,
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

    const depositPackage = await prismaClient.depositPackage.findUnique({
      where: {
        id: id,
      },
    });

    if (!depositPackage) {
      throw new Error("Cupom de desconto não encontrado");
    }

    if (!value || !name) {
      throw new Error("Preencha o nome e valor do pacote de deposito");
    }

    const depositPackageRes = await prismaClient.depositPackage.update({
      where: {
        id: id,
      },
      data: {
        description,
        name,
        value,
        bonus: bonus || 0,
      },
    });

    return depositPackageRes;
  }
}

export { EditPackageService };
