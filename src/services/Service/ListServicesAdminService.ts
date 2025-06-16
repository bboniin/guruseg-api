import prismaClient from "../../prisma";

interface ServiceRequest {
  search: string;
  userId: string;
  page: number;
  all: boolean;
}
class ListServicesAdminService {
  async execute({ userId, page, search, all }: ServiceRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (all) {
      const services = await prismaClient.service.findMany({
        orderBy: {
          name: "asc",
        },
      });

      return services;
    }

    let filter = {};

    if (search) {
      filter["name"] = {
        contains: search,
        mode: "insensitive",
      };
    }

    const servicesTotal = await prismaClient.service.count({
      where: { visible: true, ...filter },
    });

    const services = await prismaClient.service.findMany({
      where: { visible: true, ...filter },
      skip: page * 30,
      take: 30,
      orderBy: {
        name: "asc",
      },
    });

    return { services, servicesTotal };
  }
}

export { ListServicesAdminService };
