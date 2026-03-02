import prismaClient from "../../prisma";

interface PackageRequest {
  id: string;
  userId: string;
}
class GetDepositService {
  async execute({ id, userId }: PackageRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const deposit = await prismaClient.deposit.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!deposit) {
      throw new Error("Deposito não encontrado");
    }

    return deposit;
  }
}

export { GetDepositService };
