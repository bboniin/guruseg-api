import prismaClient from "../../prisma";

interface GetSSTDiagnosticRequest {
  id: string;
  userId?: string;
}

class GetSSTDiagnosticService {
  async execute({ id, userId }: GetSSTDiagnosticRequest) {
    if (!id) {
      throw new Error("ID do diagnóstico é obrigatório");
    }

    const filter: any = { id };
    if (userId) {
      filter.user_id = userId;
    }

    const item = await prismaClient.sSTDiagnostic.findFirst({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
          },
        },
      },
    });

    if (!item) {
      throw new Error("Diagnóstico não encontrado");
    }

    let parsedAnswers = {};
    let parsedStats = {};

    try {
      if (item.answers) {
        parsedAnswers =
          typeof item.answers === "string"
            ? JSON.parse(item.answers)
            : item.answers;
      }
    } catch (e) {
      parsedAnswers = {};
    }

    try {
      if (item.stats) {
        parsedStats =
          typeof item.stats === "string" ? JSON.parse(item.stats) : item.stats;
      }
    } catch (e) {
      parsedStats = {};
    }

    return {
      ...item,
      answers: parsedAnswers,
      stats: parsedStats,
    };
  }
}

export { GetSSTDiagnosticService };
