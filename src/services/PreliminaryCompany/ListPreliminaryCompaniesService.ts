import prismaClient from "../../prisma";

interface ListRequest {
  userId?: string;
  search?: string;
  status?: string;
  page?: number;
}

class ListPreliminaryCompaniesService {
  async execute({ userId, search, page = 0, status }: ListRequest) {
    let filter: any = {};

    if (userId) {
      filter["collaborador_id"] = userId;
    }

    if (search) {
      filter["razao_social"] = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (status) {
      filter["status"] = status;
    }

    const companies = await prismaClient.preliminaryCompany.findMany({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
      skip: page * 30,
      take: 30,
      include: {
        functions: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    const totalCompanies = await prismaClient.preliminaryCompany.count({
      where: filter,
    });

    const totalCompaniesConfirmed = await prismaClient.preliminaryCompany.count({
      where: { ...filter, status: "confirmado" },
    });
    const totalCompaniesExpired = await prismaClient.preliminaryCompany.count({
      where: { ...filter, status: "expirado" },
    });
    const totalCompaniesPedding = await prismaClient.preliminaryCompany.count({
      where: { ...filter, status: "aguardando" },
    });
    const totalCompaniesHandler = await prismaClient.preliminaryCompany.count({
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

export { ListPreliminaryCompaniesService };
