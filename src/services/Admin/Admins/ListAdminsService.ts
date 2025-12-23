import prismaClient from "../../../prisma";

interface AdminRequest {
  userId: string;
  filter: string;
  page: number;
}

class ListAdminsService {
  async execute({ userId, page, filter }: AdminRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad") {
      throw new Error("Rota restrita ao administrador master");
    }

    let filterSearch = {};

    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive",
      };
    }

    const adminsTotal = await prismaClient.admin.count({
      where: {
        ...filterSearch,
      },
    });

    const admins = await prismaClient.admin.findMany({
      where: {
        ...filterSearch,
      },
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });

    return { admins: admins, adminsTotal };
  }
}

export { ListAdminsService };
