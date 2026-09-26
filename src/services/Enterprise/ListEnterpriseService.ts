import prismaClient from "../../prisma";

interface ListEnterpriseRequest {
  userId: string;
  search?: string;
  page?: number;
  type?: string;
  all?: boolean;
}

class ListEnterpriseService {
  async execute({ userId, search, type, page, all }: ListEnterpriseRequest) {
    let filter: any = {
      user_id: userId,
      visible: true,
    };

    if (type) {
      filter.type = type;
    }
    if (search) {
      filter.OR = [
        { razao_social: { contains: search, mode: "insensitive" } },
        { nome_fantasia: { contains: search, mode: "insensitive" } },
        { document: { contains: search, mode: "insensitive" } },
      ];
    }

    const pageNumber = page !== undefined ? Number(page) : undefined;
    const take = 30;
    const skip =
      !all && pageNumber !== undefined ? pageNumber * take : undefined;

    const enterprises = await prismaClient.enterprise.findMany({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
      ...(!all && skip !== undefined && { skip }),
      ...(!all && pageNumber !== undefined && { take }),
    });

    const total = await prismaClient.enterprise.count({
      where: filter,
    });

    return { enterprises, total };
  }
}

export { ListEnterpriseService };
