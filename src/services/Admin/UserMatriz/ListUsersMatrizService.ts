import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface ServiceRequest {
  userId: string;
  type: string;
  filter: string;
  page: number;
  all: boolean;
}

class ListUsersMatrizService {
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
          type: "matriz",
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
        type: "matriz",
        ...filterSearch,
      },
    });

    const users = await prismaClient.user.findMany({
      where: {
        visible: true,
        type: "matriz",
        ...filterSearch,
      },
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });
    const s3Storage = new S3Storage();
    const usersResponse = await Promise.all(
      users.map(async (user) => {
        if (user.photo) {
          user["photo_url"] = await s3Storage.getTemporaryUrl(user.photo, 245);
        }

        return user;
      }),
    );

    return { users: usersResponse, usersTotal };
  }
}

export { ListUsersMatrizService };
