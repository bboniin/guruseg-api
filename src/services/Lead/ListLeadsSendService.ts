import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface LeadRequest {
  page: number;
  all: boolean;
  dateStart: string;
  dateEnd: string;
}

class ListLeadsSendService {
  async execute({ page, all, dateStart, dateEnd }: LeadRequest) {
    let filter = {};

    if (all) {
      const leads = await prismaClient.leadMaster.findMany({
        where: {
          leads: {
            none: {},
          },
        },
        orderBy: {
          name: "desc",
        },
      });

      return leads;
    }

    if (dateStart) {
      filter["create_at"] = {
        gte: startOfDay(new Date(dateStart)),
        lte: endOfDay(new Date(dateEnd)),
      };
    }

    const listLeadsTotal = await prismaClient.leadMaster.count({
      where: filter,
    });

    const listLeads = await prismaClient.leadMaster.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc",
      },
      include: {
        leads: {
          include: {
            user: true,
          },
          orderBy: {
            create_at: "desc",
          },
        },
      },
    });

    return { leads: listLeads, leadsTotal: listLeadsTotal };
  }
}

export { ListLeadsSendService };
