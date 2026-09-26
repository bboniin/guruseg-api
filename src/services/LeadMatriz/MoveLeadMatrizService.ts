import prismaClient from "../../prisma";

interface MoveLeadMatrizRequest {
  id: string;
  status: string;
}

class MoveLeadMatrizService {
  async execute({ id, status }: MoveLeadMatrizRequest) {
    if (!id || !status) {
      throw new Error("ID do lead e novo status são obrigatórios.");
    }

    const leadExists = await prismaClient.leadMatriz.findUnique({
      where: { id },
    });

    if (!leadExists) {
      throw new Error("Lead da matriz não encontrado.");
    }

    const leadMatriz = await prismaClient.leadMatriz.update({
      where: { id },
      data: {
        status,
        update_at: new Date(),
      },
    });

    return leadMatriz;
  }
}

export { MoveLeadMatrizService };
