import prismaClient from "../../prisma";

interface CompanyRequest {
  userId: string;
  search: string;
  status: string;
  page: number;
}

class ListCompaniesService {
  async execute({ userId, search, page, status }: CompanyRequest) {
    let filter = { collaborador_id: userId };

    if (search) {
      filter["razao_social"] = {
        contains: search,
        mode: "insensitive",
      };
    }
    if (status) {
      filter["status"] = status;
    }

    const companies = await prismaClient.company.findMany({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
      skip: page * 30,
      take: 30,
      include: {
        companySector: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    const totalCompanies = await prismaClient.company.count({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
    });

    const totalCompaniesConfirmed = await prismaClient.company.count({
      where: { ...filter, status: "confirmado" },
    });
    const totalCompaniesExpired = await prismaClient.company.count({
      where: { ...filter, status: "expirado" },
    });
    const totalCompaniesPedding = await prismaClient.company.count({
      where: { ...filter, status: "aguardando" },
    });
    const totalCompaniesHandler = await prismaClient.company.count({
      where: { ...filter, status: "alteracao" },
    });

    return {
      companies,
      totalCompanies,
      infosTotalCompanies: {
        totalCompaniesConfirmed,
        totalCompaniesExpired,
        totalCompaniesPedding,
        totalCompaniesHandler,
      },
    };
  }
}

export { ListCompaniesService };
