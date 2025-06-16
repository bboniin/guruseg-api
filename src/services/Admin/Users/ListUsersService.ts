import prismaClient from "../../../prisma";

interface ServiceRequest {
  userId: string;
  type: string;
  filter: string;
  page: number;
  all: boolean;
}

class ListUsersService {
  async execute({ userId, type, page, filter, all }: ServiceRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin && type != "all") {
      throw new Error("Rota restrita ao administrador");
    }

    let filterSearch = {};

    if (type == "all") {
      type = "";
    }

    if (!all) {
      if (filter) {
        filterSearch["name"] = {
          contains: filter,
          mode: "insensitive",
        };
      }
    }

    const usersTotal = await prismaClient.user.count({
      where: {
        visible: true,
        category: { contains: type },
        ...filterSearch,
      },
    });

    const users = await prismaClient.user.findMany({
      where: {
        visible: true,
        category: { contains: type },
        ...filterSearch,
      },
      orderBy: {
        create_at: "asc",
      },
      ...(all ? {} : { skip: page * 30, take: 30 }),
    });

    return { users, usersTotal };
  }
}

export { ListUsersService };
