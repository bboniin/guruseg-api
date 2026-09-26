import prismaClient from "../../prisma";

interface StatementRequest {
  title: string;
  description: string;
  id: string;
}

class EditStatementService {
  async execute({ description, title, id }: StatementRequest) {
    const statementGet = await prismaClient.statement.findUnique({
      where: {
        id: id,
      },
    });

    if (!statementGet) {
      throw new Error("Comunicado não encontrado");
    }

    if (!title || !description) {
      throw new Error("Preencha titulo e descrição para salvar");
    }

    const statement = await prismaClient.statement.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });

    return statement;
  }
}

export { EditStatementService };
