import prismaClient from "../../prisma";

interface CompanyRequest {
  userId: string;
  order_id: number;
}

class ListCompaniesConfirmService {
  async execute({ userId, order_id }: CompanyRequest) {
    const companies = await prismaClient.company.findMany({
      where: {
        collaborador_id: userId,
        status: "confirmado",
        OR: [
          {
            order_id: order_id,
          },
          {
            order_id: 0,
          },
        ],
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

    return companies;
  }
}

export { ListCompaniesConfirmService };
