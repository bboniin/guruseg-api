import prismaClient from "../../prisma";

interface StatementRequest {
  id: string;
}

class GetStatementService {
  async execute({ id }: StatementRequest) {
    const statement = await prismaClient.statement.findUnique({
      where: {
        id: id,
      },
      include: {
        statement_confirms: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!statement) {
      throw new Error("Comunicado não encontrado");
    }

    return statement;
  }
}

export { GetStatementService };
