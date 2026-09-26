import prismaClient from "../../prisma";

interface StatementRequest {
  title: string;
  description: string;
}
class CreateStatementService {
  async execute({ title, description }: StatementRequest) {
    if (!title || !description) {
      throw new Error("Preencha titulo e descrição para salvar");
    }

    const statement = await prismaClient.statement.create({
      data: {
        title: title,
        description: description,
      },
    });

    return statement;
  }
}

export { CreateStatementService };
