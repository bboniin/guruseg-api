import prismaClient from "../../prisma";

interface PackageRequest {
  userId: string;
  id: string;
}

class DeletePackageService {
  async execute({ userId, id }: PackageRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const depositPackage = await prismaClient.depositPackage.findFirst({
      where: {
        id: id,
      },
    });

    if (!depositPackage) {
      throw new Error("Pacode de deposito não encontrado");
    }

    const depositPackageDel = await prismaClient.depositPackage.delete({
      where: {
        id: id,
      },
    });

    return depositPackageDel;
  }
}

export { DeletePackageService };
