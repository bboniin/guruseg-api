import prismaClient from "../../prisma";

interface ListEnterpriseTecnicoRequest {
  userId: string;
  user_id?: string;
  search?: string;
  page?: number;
  type?: string;
  all?: boolean;
}

class ListEnterpriseTecnicoService {
  async execute({
    userId,
    user_id,
    search,
    type,
    page,
    all,
  }: ListEnterpriseTecnicoRequest) {
    const isTecnic = await prismaClient.collaborator.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isTecnic) {
      throw new Error("Rota restrita para técnicos");
    }

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

export { ListEnterpriseTecnicoService };
