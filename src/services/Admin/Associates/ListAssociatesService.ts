import { addDays } from "date-fns";
import prismaClient from "../../../prisma";

interface AssociateRequest {
  filter: string;
  page: number;
  all: boolean;
}

class ListAssociatesService {
  async execute({ page, filter, all }: AssociateRequest) {
    let filterSearch = {};

    if (all) {
      const associates = await prismaClient.associate.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          create_at: "asc",
        },
      });
      return { associates };
    }
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive",
      };
    }

    const associatesTotal = await prismaClient.associate.count({
      where: {
        visible: true,
        ...filterSearch,
      },
    });

    const associates = await prismaClient.associate.findMany({
      where: {
        visible: true,
        ...filterSearch,
      },
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });

    return { associates: associates, associatesTotal };
  }
}

export { ListAssociatesService };
