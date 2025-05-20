import { differenceInSeconds, endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface OrderRequest {
  userId: string;
  id: Number;
  user_id: string;
  collaborator_id: string;
  status: string;
  status_payment: string;
  startDate: string;
  endDate: string;
  page: number;
}

class ListAdminOrdersService {
  async execute({
    userId,
    id,
    collaborator_id,
    user_id,
    status,
    status_payment,
    startDate,
    endDate,
    page,
  }: OrderRequest) {
    let filter = {};

    if (id) {
      filter["id"] = id;
    }
    if (collaborator_id) {
      filter["collaborator_id"] = collaborator_id;
    }
    if (user_id) {
      filter["user_id"] = user_id;
    }
    if (status) {
      filter["status"] = status;
    }

    if (status_payment) {
      if (status_payment == "Sem integração") {
        filter["asaas_integration"] = false;
      } else {
        filter["status_payment"] = status_payment;
      }
    }

    if (endDate && startDate) {
      filter["AND"] = [
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

    const ordersTotal = await prismaClient.order.findMany({
      where: filter,
      include: {
        items: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    const orders = await prismaClient.order.findMany({
      where: filter,
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

    const statusC = {
      aberto: 0,
      andamento: 0,
      pendente: 0,
      validacao: 0,
      alteracao: 0,
      finalizado: 1,
      cancelado: 1,
      recusado: 1,
    };

    let averageTime = 0;
    let OSfinish = 0;

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
        averageTime += item["averageTime"];
        OSfinish++;
      }
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

export { ListAdminOrdersService };
