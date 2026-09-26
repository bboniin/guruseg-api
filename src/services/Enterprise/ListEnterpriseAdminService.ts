import prismaClient from "../../prisma";

interface ListEnterpriseAdminRequest {
  user_id?: string;
  search?: string;
  type?: string;
  page?: number;
  all?: boolean;
}

class ListEnterpriseAdminService {
  async execute({
    user_id,
    search,
    type,
    page,
    all,
  }: ListEnterpriseAdminRequest) {
    let filter: any = {
      visible: true,
    };

    if (user_id) {
      filter.user_id = user_id;
    }
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
          },
        },
        orders: true,
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

export { ListEnterpriseAdminService };
