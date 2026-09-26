import prismaClient from "../../prisma";

interface PackageRequest {
  description: string;
  name: string;
  value: number;
  bonus: number;
  type: string;
}

class CreatePackageService {
  async execute({ description, type, name, value, bonus }: PackageRequest) {
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
