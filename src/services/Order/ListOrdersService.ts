import { differenceInSeconds, endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface OrderRequest {
  userId: string;
  type: string;
  finance: boolean;
  startDate: string;
  endDate: string;
  status: string;
  collaborator_id: string;
  user_id: string;
  page: number;
}

class ListOrdersService {
  async execute({
    userId,
    type,
    finance,
    startDate,
    endDate,
    status,
    page,
    collaborator_id,
    user_id,
  }: OrderRequest) {
    let data = {};

    if (type == "cliente") {
      data = {
        user_id: userId,
      };
    } else {
      if (type == "tecnico") {
        data = {
          collaborator_id: userId,
        };
      } else {
        throw new Error("Nenhum tipo de usuário foi enviado.");
      }
    }

    if (finance) {
      data["asaas_integration"] = false;
      data["status"] = "finalizado";
      if (endDate && startDate) {
        data["AND"] = [
          {
            update_at: {
              gte: startOfDay(new Date(startDate)),
            },
          },
          {
            update_at: {
              lte: endOfDay(new Date(endDate)),
            },
          },
        ];
      }
    } else {
      if (status) {
        data["status"] = status;
      }
      if (collaborator_id) {
        data["collaborator_id"] = collaborator_id;
      }
      if (user_id) {
        data["user_id"] = user_id;
      }
      if (endDate && startDate) {
        data["AND"] = [
          {
            update_at: {
              gte: startOfDay(new Date(startDate)),
            },
          },
          {
            update_at: {
              lte: endOfDay(new Date(endDate)),
            },
          },
        ];
      }
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
        user: true,
        collaborator: true,
      },
    });

    const statusC = {
      aberto: 0,
      andamento: 0,
      pendente: 0,
      alteracao: 0,
      finalizado: 1,
      cancelado: 1,
      recusado: 1,
    };

    orders.map((item) => {
      item["totalValue"] = 0;
      item["totalServices"] = 0;
      item["totalValueComission"] = 0;
      item.items.map((data) => {
        item["totalServices"] += data.amount;
        item["totalValue"] += data.amount * data.value;
        item["totalValueComission"] += data.amount * data.commission;
      });
      if (item.status == "finalizado") {
        item["averageTime"] = differenceInSeconds(
          item.update_at,
          item.create_at
        );
      }
    });

    let totalServices = 0;
    let totalValue = 0;
    let totalValueComission = 0;

    let averageTime = 0;
    let OSfinish = 0;

    ordersTotal.map((item) => {
      item.items.map((data) => {
        totalValue += data.amount * data.value;
        totalServices += data.amount;
        totalValueComission += data.amount * data.commission;
      });
      if (item.status == "finalizado") {
        averageTime += differenceInSeconds(item.update_at, item.create_at);
        OSfinish++;
      }
    });

    const ordersStatus = orders.sort(function (a, b) {
      return statusC[a.status] < statusC[b.status]
        ? -1
        : statusC[a.status] > statusC[b.status]
        ? 1
        : 0;
    });

    return {
      orders: ordersStatus,
      ordersTotal: ordersTotal.length,
      totalValue,
      totalServices,
      totalValueComission,
      averageTime: averageTime / OSfinish,
    };
  }
}

export { ListOrdersService };
