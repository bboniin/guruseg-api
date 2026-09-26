import prismaClient from "../../prisma";

interface PackageRequest {
  id: string;
}
class GetDepositService {
  async execute({ id }: PackageRequest) {
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
