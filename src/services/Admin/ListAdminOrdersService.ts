import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface OrderRequest {
  id: string;
  type: string;
  finance: boolean;
  startDate: Date;
  endDate: Date;
  page: number;
}

class ListAdminOrdersService {
  async execute({ id, type, page, finance, startDate, endDate }: OrderRequest) {
    let data = {};
    if (type == "cliente") {
      data = {
        user_id: id,
      };
    } else {
      if (type == "tecnico") {
        data = {
          collaborator_id: id,
        };
      } else {
        throw new Error("Nenhum tipo de usuário foi enviado.");
      }
    }

    if (finance) {
      data["status"] = "finalizado";
      data["AND"] = [
        {
          update_at: {
            gte: startOfDay(startDate),
          },
        },
        {
          update_at: {
            lte: endOfDay(endDate),
          },
        },
      ];
    } else {
      data["AND"] = [
        {
          create_at: {
            gte: startOfDay(startDate),
          },
        },
        {
          create_at: {
            lte: endOfDay(endDate),
          },
        },
      ];
    }

    const ordersTotal = await prismaClient.order.findMany({
      where: data,
      include: {
        items: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    const orders = await prismaClient.order.findMany({
      where: data,
      orderBy: {
        update_at: "desc",
      },

      skip: page * 30,
      take: 30,
      include: {
        items: {
          orderBy: {
            create_at: "asc",
          },
        },
        docs: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    orders.map((item) => {
      item["totalValue"] = 0;
      item["totalServices"] = 0;
      item["totalValueComission"] = 0;
      item.items.map((data) => {
        item["totalServices"] += data.amount;
        item["totalValue"] += data.amount * data.value;
        item["totalValueComission"] += data.amount * data.commission;
      });
    });

    let totalServices = 0;
    let totalValue = 0;
    let totalValueComission = 0;

    ordersTotal.map((item) => {
      item.items.map((data) => {
        totalValue += data.amount * data.value;
        totalServices += data.amount;
        totalValueComission += data.amount * data.commission;
      });
    });

    return {
      orders: orders,
      ordersTotal: ordersTotal.length,
      totalValue,
      totalServices,
      totalValueComission,
    };
  }
}

export { ListAdminOrdersService };
