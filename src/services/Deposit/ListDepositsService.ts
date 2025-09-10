import prismaClient from "../../prisma";

interface DepositRequest {
  userId: string;
  page: number;
}

class ListDepositsService {
  async execute({ userId, page }: DepositRequest) {
    const deposits = await prismaClient.deposit.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });

    return deposits;
  }
}

export { ListDepositsService };
