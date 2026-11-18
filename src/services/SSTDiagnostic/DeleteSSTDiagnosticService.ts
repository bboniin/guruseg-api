import prismaClient from "../../prisma";

interface DeleteSSTDiagnosticRequest {
  id: string;
  userId: string;
}

class DeleteSSTDiagnosticService {
  async execute({ id, userId }: DeleteSSTDiagnosticRequest) {
    if (!id) {
      throw new Error("ID do diagnóstico é obrigatório");
    }

    const item = await prismaClient.sSTDiagnostic.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!item) {
      throw new Error("Diagnóstico não encontrado ou não pertence a este usuário");
    }

    await prismaClient.sSTDiagnostic.delete({
      where: { id },
    });

    return { message: "Diagnóstico excluído com sucesso" };
  }
}

export { DeleteSSTDiagnosticService };
