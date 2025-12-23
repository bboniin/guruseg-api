import { addDays } from "date-fns";
import prismaClient from "../../../prisma";

interface AttendantRequest {
  userId: string;
  filter: string;
  page: number;
  all: boolean;
}

class ListAttendantsService {
  async execute({ userId, page, filter, all }: AttendantRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

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
