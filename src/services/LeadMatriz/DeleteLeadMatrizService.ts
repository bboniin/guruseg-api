import prismaClient from "../../prisma";

interface DeleteLeadMatrizRequest {
  id: string;
}

class DeleteLeadMatrizService {
  async execute({ id }: DeleteLeadMatrizRequest) {
    if (!id) {
      throw new Error("ID do lead é obrigatório.");
    }

    const leadExists = await prismaClient.leadMatriz.findUnique({
      where: { id },
    });

    if (!leadExists) {
      throw new Error("Lead da matriz não encontrado.");
    }

    const leadMatriz = await prismaClient.leadMatriz.delete({
      where: { id },
    });

    return leadMatriz;
  }
}

export { DeleteLeadMatrizService };
