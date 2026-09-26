import prismaClient from "../../prisma";

interface PackageRequest {
  id: string;
}

class DeletePackageService {
  async execute({ id }: PackageRequest) {
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
