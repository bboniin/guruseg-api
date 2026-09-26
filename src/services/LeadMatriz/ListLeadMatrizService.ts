import prismaClient from "../../prisma";

interface ListLeadMatrizRequest {
  user_id?: string;
  search?: string;
  status?: string;
  page?: number;
  all?: boolean;
}

class ListLeadMatrizService {
  async execute({ user_id, search, status, page, all }: ListLeadMatrizRequest) {
    let whereCondition: any = {};

    if (user_id) {
      whereCondition.user_id = user_id;
    }

    if (status) {
      whereCondition.status = status;
    }

    if (search) {
      whereCondition.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone_number: { contains: search, mode: "insensitive" } },
        { cnpj: { contains: search, mode: "insensitive" } },
      ];
    }

    if (all) {
      const leads = await prismaClient.leadMatriz.findMany({
        where: whereCondition,
        orderBy: {
          create_at: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return { leads, total: leads.length };
    }

    const pageNumber = page !== undefined ? Number(page) : 0;
    const take = 30;
    const skip = pageNumber * take;

    const total = await prismaClient.leadMatriz.count({
      where: whereCondition,
    });

    const leads = await prismaClient.leadMatriz.findMany({
      where: whereCondition,
      orderBy: {
        create_at: "desc",
      },
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return { leads, total };
  }
}

export { ListLeadMatrizService };
