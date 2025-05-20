import prismaClient from "../../prisma";

interface CompanyRequest {
  userId: string;
}

class ListCompaniesService {
  async execute({ userId }: CompanyRequest) {
    const companies = await prismaClient.company.findMany({
      where: {
        collaborador_id: userId,
      },
      orderBy: {
        update_at: "desc",
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    const status = {
      expirado: 0,
      aguardando: 1,
      confirmado: 2,
      alteracao: 1,
    };

    let companiesStatus = companies.sort(function (a, b) {
      return status[a.status] < status[b.status]
        ? -1
        : status[a.status] > status[b.status]
        ? 1
        : 0;
    });

    return companiesStatus;
  }
}

export { ListCompaniesService };
