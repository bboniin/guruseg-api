import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface LeadRequest {
  page: number;
  userId: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  all: boolean;
}

class ListMyLeadsService {
  async execute({
    page,
    userId,
    status,
    all,
    dateStart,
    dateEnd,
  }: LeadRequest) {
    let filter = {};

    filter["user_id"] = userId;

    if (status) {
      filter["status"] = status;
    }

    if (all) {
      const leads = await prismaClient.lead.findMany({
        where: filter,
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

    const listLeadsTotal = await prismaClient.lead.count({
      where: filter,
    });

    const listLeads = await prismaClient.lead.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc",
      },
      include: {
        reminders: true,
        contracts: {
          include: {
            services: true,
          },
        },
      },
    });

    return { leads: listLeads, leadsTotal: listLeadsTotal };
  }
}

export { ListMyLeadsService };
