import prismaClient from "../../prisma";

interface CredentialRequest {
  filter: string;
  page: number;
}

class AdminListCredentialsService {
  async execute({ filter, page }: CredentialRequest) {
    let filterObj = {};

    if (filter) {
      filterObj["OR"] = [
        {
          city: {
            contains: filter,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: filter,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: filter,
            mode: "insensitive",
          },
        },
        {
          state: {
            contains: filter,
            mode: "insensitive",
          },
        },
        {
          served_cities: {
            contains: filter,
            mode: "insensitive",
          },
        },
      ];
    }

    const credentialsTotal = await prismaClient.credential.count({
      where: filterObj,
    });

    const credentials = await prismaClient.credential.findMany({
      where: filterObj,
      orderBy: {
        update_at: "desc",
      },
      skip: page * 30,
      take: 30,
      select: {
        email: true,
        name: true,
        phone_number: true,
        state: true,
        city: true,
        services: true,
        served_cities: true,
        profession: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true,
      },
    });

    return { credentials, total: credentialsTotal };
  }
}

export { AdminListCredentialsService };
