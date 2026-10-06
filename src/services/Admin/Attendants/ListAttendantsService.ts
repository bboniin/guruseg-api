import { addDays } from "date-fns";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

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

    const s3Storage = new S3Storage();
    const attendantsResponse = await Promise.all(
      attendants.map(async (attendant) => {
        if (attendant.photo) {
          attendant["photo_url"] = await s3Storage.getTemporaryUrl(
            attendant.photo,
            245,
          );
        }

        return attendant;
      }),
    );
    return { attendants: attendantsResponse, attendantsTotal };
  }
}

export { ListAttendantsService };
