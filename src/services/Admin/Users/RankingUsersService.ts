import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../../prisma";

interface ServiceRequest {
  userId: string;
  date_start: string;
  date_end: string;
}

class RankingUsersService {
  async execute({ userId, date_start, date_end }: ServiceRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    let filterSearch = {};

    if (!date_start || !date_end) {
      throw new Error("Data de inicio e fim do periodo é obrigátorio");
    }

    filterSearch["create_at"] = {
      gte: startOfDay(new Date(date_start)),
      lte: endOfDay(new Date(date_end)),
    };

    const users = await prismaClient.user.findMany({
      where: {
        visible: true,
      },
      include: {
        orders: {
          where: filterSearch,
          include: {
            items: true,
          },
        },
      },
    });

    users.map((data) => {
      data["totalPayment"] = 0;
      data["totalServices"] = 0;
      data["totalUrgency"] = 0;
      data["servicesPeriod"] = {};
      data.orders.map((item) => {
        if (item.urgent) {
          data["totalUrgency"]++;
        }
        item.items.map((item) => {
          data["totalServices"] += item.amount;
          data["totalPayment"] += item.amount + item.value;
          if (!data["servicesPeriod"][item.id]) {
            data["servicesPeriod"][item.id] = {
              name: item.name,
              value: item.value,
              amount: item.amount,
            };
          } else {
            data["servicesPeriod"][item.id]["amount"] += item.amount;
          }
        });
      });
      data["servicesPeriod"] = Object.values(data["servicesPeriod"]);
      data["servicesPeriod"] = data["servicesPeriod"].sort((a, b) => {
        return b["amount"] - a["amount"];
      });
    });

    const orderUsers = users.sort((a, b) => {
      return b["totalPayment"] - a["totalPayment"];
    });

    return orderUsers;
  }
}

export { RankingUsersService };
