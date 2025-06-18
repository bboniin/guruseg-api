import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface ResumeRequest {
  start_date: Date;
  end_date: Date;
  userId: string;
}

class GetResumeService {
  async execute({ start_date, end_date, userId }: ResumeRequest) {
    let responseData = [];

    const filterDate = {
      AND: [
        {
          create_at: {
            gte: startOfDay(new Date(start_date)),
          },
        },
        {
          create_at: {
            lte: endOfDay(new Date(end_date)),
          },
        },
      ],
    };

    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (admin) {
      const ordersCount = await prismaClient.order.count({
        where: filterDate,
      });

      responseData.push({
        value: ordersCount,
        type: "number",
        name: "OS abertas nesse periodo",
      });

      const usersTotal = await prismaClient.user.count({
        where: {
          visible: true,
        },
      });

      responseData.push({
        value: usersTotal,
        type: "number",
        name: "Total de franqueados",
      });

      const modulesTotal = await prismaClient.module.count();

      responseData.push({
        value: modulesTotal,
        type: "number",
        name: "Módulos ativos",
      });

      const payments = await prismaClient.payment.findMany({
        where: { ...filterDate, status: "pendente" },
      });

      const paymentsValue = payments.reduce(
        (sum, payment) => sum + payment.value,
        0
      );

      responseData.push({
        value: paymentsValue,
        type: "currency",
        name: "A receber de pagamentos",
      });

      const paymentsConfirm = await prismaClient.payment.findMany({
        where: { ...filterDate, status: "confirmado" },
      });

      const paymentsConfirmValue = paymentsConfirm.reduce(
        (sum, payment) => sum + payment.value,
        0
      );

      responseData.push({
        value: paymentsConfirmValue,
        type: "currency",
        name: "Pagamentos confirmados",
      });

      const ordersOpenCount = await prismaClient.order.count({
        where: {
          ...filterDate,
          status: {
            notIn: ["finalizado", "cancelado"],
          },
        },
      });

      responseData.push({
        value: ordersOpenCount,
        type: "number",
        name: "OS em aberto",
      });

      const ordersFinish = await prismaClient.order.count({
        where: {
          AND: [
            {
              update_at: {
                gte: startOfDay(new Date(start_date)),
              },
            },
            {
              update_at: {
                lte: endOfDay(new Date(end_date)),
              },
            },
          ],
          status: "finalizado",
        },
      });

      responseData.push({
        value: ordersFinish,
        type: "number",
        name: "OS finalizadas nesse periodo",
      });
      const leadsCount = await prismaClient.leadMaster.count({
        where: filterDate,
      });

      responseData.push({
        value: leadsCount,
        type: "number",
        name: "Leads por periodo",
      });

      return responseData;
    }

    throw new Error("Nenhum usuário encontrado");
  }
}

export { GetResumeService };
