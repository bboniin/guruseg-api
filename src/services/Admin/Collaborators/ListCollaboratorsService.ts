import { addDays } from "date-fns";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface ServiceRequest {
  userId: string;
  filter: string;
  page: number;
  all: boolean;
}

class ListCollaboratorsService {
  async execute({ userId, page, filter, all }: ServiceRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin && !all) {
      throw new Error("Rota restrita ao administrador");
    }

    let filterSearch = {};

    if (all) {
      const collaborators = await prismaClient.collaborator.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          create_at: "asc",
        },
      });
      return { collaborators };
    }
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive",
      };
    }

    const collaboratorsTotal = await prismaClient.collaborator.count({
      where: {
        visible: true,
        ...filterSearch,
      },
    });

    const collaborators = await prismaClient.collaborator.findMany({
      where: {
        visible: true,
        ...filterSearch,
      },
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
      include: {
        orders: {
          where: {
            create_at: {
              gte: addDays(new Date(), -7),
            },
          },
          include: {
            items: true,
            messages: true,
          },
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    collaborators.map((data) => {
      data["totalWeek"] = 0;
      data.orders.map((item) => {
        item.items.map((item) => {
          data["totalWeek"] += item.amount * item.commission;
        });
      });
    });

    const s3Storage = new S3Storage();
    const collaboratorsResponse = await Promise.all(
      collaborators.map(async (collaborator) => {
        if (collaborator.photo) {
          collaborator["photo_url"] = await s3Storage.getTemporaryUrl(
            collaborator.photo,
            245,
          );
        }

        return collaborator;
      }),
    );

    return { collaborators: collaboratorsResponse, collaboratorsTotal };
  }
}

export { ListCollaboratorsService };
