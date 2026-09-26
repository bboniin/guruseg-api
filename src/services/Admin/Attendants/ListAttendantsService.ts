import { addDays } from "date-fns";
import prismaClient from "../../../prisma";

interface AttendantRequest {
  filter: string;
  page: number;
  all: boolean;
}

class ListAttendantsService {
  async execute({ page, filter, all }: AttendantRequest) {
    let filterSearch = {};

    if (all) {
      const attendants = await prismaClient.attendant.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          create_at: "asc",
        },
      });
      return { attendants };
    }
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive",
      };
    }

    const attendantsTotal = await prismaClient.attendant.count({
      where: {
        visible: true,
        ...filterSearch,
      },
    });

    const attendants = await prismaClient.attendant.findMany({
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

    return { attendants: attendants, attendantsTotal };
  }
}

export { ListAttendantsService };
