import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface DepositRequest {
  userId: string;
  collaborator_id: string;
  page: number;
  startDate: string;
  endDate: string;
  status: string;
}

class ListDepositsAdminService {
  async execute({
    userId,
    page,
    collaborator_id,
    status,
    endDate,
    startDate,
  }: DepositRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    let filter = {};

    if (collaborator_id) {
      filter["user_id"] = collaborator_id;
    }

    if (status) {
      filter["status"] = status;
    }

    if (endDate && startDate) {
      filter["AND"] = [
        {
          update_at: {
            gte: startOfDay(new Date(startDate)),
          },
        },
        {
          update_at: {
            lte: endOfDay(new Date(endDate)),
          },
        },
      ];
    }

    const depositsTotal = await prismaClient.deposit.count({
      where: filter,
    });

    const deposits = await prismaClient.deposit.findMany({
      where: filter,
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });

    return { deposits, depositsTotal };
  }
}

export { ListDepositsAdminService };
