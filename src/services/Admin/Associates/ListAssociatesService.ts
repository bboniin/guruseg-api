import { addDays } from "date-fns";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

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
    const s3Storage = new S3Storage();
    const associatesResponse = await Promise.all(
      associates.map(async (associate) => {
        if (associate.photo) {
          associate["photo_url"] = await s3Storage.getTemporaryUrl(
            associate.photo,
            245,
          );
        }

        return associate;
      }),
    );
    return { associates: associatesResponse, associatesTotal };
  }
}

export { ListAssociatesService };
