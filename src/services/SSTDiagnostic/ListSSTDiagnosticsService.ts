import prismaClient from "../../prisma";

interface ListSSTDiagnosticsRequest {
  userId: string;
  search?: string;
  page?: number;
  all?: boolean;
}

class ListSSTDiagnosticsService {
  async execute({ userId, search, page = 0, all }: ListSSTDiagnosticsRequest) {
    let filter: any = {
      user_id: userId,
    };

    if (search) {
      filter.company_name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const pageNumber = page !== undefined ? Number(page) : 0;
    const take = 30;
    const skip = !all ? pageNumber * take : undefined;

    const [diagnosticsRaw, total] = await Promise.all([
      prismaClient.sSTDiagnostic.findMany({
        where: filter,
        orderBy: {
          create_at: "desc",
        },
        ...(!all && { skip, take }),
      }),
      prismaClient.sSTDiagnostic.count({
        where: filter,
      }),
    ]);

    const diagnostics = diagnosticsRaw.map((item) => {
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
            typeof item.stats === "string"
              ? JSON.parse(item.stats)
              : item.stats;
        }
      } catch (e) {
        parsedStats = {};
      }

      return {
        ...item,
        answers: parsedAnswers,
        stats: parsedStats,
      };
    });

    return {
      diagnostics,
      total,
      page: pageNumber,
    };
  }
}

export { ListSSTDiagnosticsService };
