import prismaClient from "../../prisma";

interface StatementRequest {
  id: string;
}

class DeleteStatementService {
  async execute({ id }: StatementRequest) {
    const statement = await prismaClient.statement.findFirst({
      where: {
        id: id,
      },
    });

    if (!statement) {
      throw new Error("Comunicado não encontrado");
    }

    await prismaClient.statement.delete({
      where: {
        id: id,
      },
    });

    return "Deletado com sucesso";
  }
}

export { DeleteStatementService };
