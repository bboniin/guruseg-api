import { addDays } from "date-fns";
import prismaClient from "../../prisma";

interface StatementRequest {
  userId: string;
}

class LastStatementsUserService {
  async execute({ userId }: StatementRequest) {
    const listStatements = await prismaClient.statement.findMany({
      where: {
        create_at: {
          gte: addDays(new Date(), -30),
        },
      },
      orderBy: {
        create_at: "desc",
      },
    });

    return listStatements;
  }
}

export { LastStatementsUserService };
