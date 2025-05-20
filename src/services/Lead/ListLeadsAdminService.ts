import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface LeadRequest {
  page: number;
  userId: string;
  dateStart: string;
  dateEnd: string;
  status: string;
}

class ListLeadsAdminService {
  async execute({ page, userId, status, dateStart, dateEnd }: LeadRequest) {
    let filter = {};

    if (userId) {
      filter["user_id"] = userId;
    }
    if (status) {
      filter["status"] = status;
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
        user: true,
        lead_reminders: true,
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

export { ListLeadsAdminService };
