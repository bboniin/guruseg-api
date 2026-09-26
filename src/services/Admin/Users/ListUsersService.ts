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

    if (!admin && !all) {
      throw new Error("Rota restrita ao administrador");
    }

    let filterSearch = {};

    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive",
      };
    }
    if (type) {
      filterSearch["category"] = type;
    }

    if (all) {
      const users = await prismaClient.user.findMany({
        where: {
          visible: true,
          type: "cliente",
          category: { contains: type },
          ...filterSearch,
        },
        orderBy: {
          create_at: "asc",
        },
      });

      return { users };
    }

    const usersTotal = await prismaClient.user.count({
      where: {
        visible: true,
        type: "cliente",
        ...filterSearch,
      },
    });

    const users = await prismaClient.user.findMany({
      where: {
        visible: true,
        type: "cliente",
        ...filterSearch,
      },
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });

    return { users, usersTotal };
  }
}

export { ListUsersService };
