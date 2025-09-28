import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface ResumeRequest {
  start_date: Date;
  end_date: Date;
  userId: string;
}

class GetUserResumeService {
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

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      const ordersCount = await prismaClient.order.count({
        where: { ...filterDate, user_id: userId },
      });

      responseData.push({
        value: ordersCount,
        type: "number",
        name: "OS solicitadas nesse periodo",
      });

      const ordersOpenCount = await prismaClient.order.count({
        where: {
          ...filterDate,
          status: {
            notIn: ["finalizado", "cancelado"],
          },
          user_id: userId,
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
          user_id: userId,
          status: "finalizado",
        },
      });

      responseData.push({
        value: ordersFinish,
        type: "number",
        name: "OS finalizadas nesse periodo",
      });

      const modulesTotal = await prismaClient.module.count();

      responseData.push({
        value: modulesTotal,
        type: "number",
        name: "Módulos ativos",
      });

      const payments = await prismaClient.payment.findMany({
        where: { ...filterDate, status: "pendente", user_id: userId },
      });

      const paymentsValue = payments.reduce(
        (sum, payment) => sum + payment.value,
        0
      );

      responseData.push({
        value: paymentsValue,
        type: "currency",
        name: "Pagamentos pendentes",
      });

      const paymentsConfirm = await prismaClient.payment.findMany({
        where: { ...filterDate, status: "confirmado", user_id: userId },
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
      responseData.push({
        value: user.balance,
        type: "currency",
        name: "Saldo disponivel",
      });

      responseData.push({
        value: user.bonus,
        type: "currency",
        name: "Bônus disponivel",
      });

      const leadsCount = await prismaClient.lead.count({
        where: { ...filterDate, user_id: userId, price: 0 },
      });

      responseData.push({
        value: leadsCount,
        type: "number",
        name: "Leads recebidos",
      });

      const leadsCountBuy = await prismaClient.lead.count({
        where: {
          ...filterDate,
          user_id: userId,
          price: {
            gt: 0,
          },
        },
      });

      responseData.push({
        value: leadsCountBuy,
        type: "number",
        name: "Leads comprados",
      });

      const leadsDisponible = await prismaClient.leadMaster.count({
        where: {
          ...filterDate,
          leads: {
            none: {},
          },
          price: {
            gt: 0,
          },
        },
      });

      responseData.push({
        value: leadsDisponible,
        type: "number",
        name: "Leads disponiveis",
      });

      const contractsSend = await prismaClient.contract.count({
        where: { ...filterDate, user_id: userId },
      });

      responseData.push({
        value: contractsSend,
        type: "number",
        name: "Contratos enviados",
      });

      const formsSends = await prismaClient.company.count({
        where: { ...filterDate, collaborador_id: userId },
      });

      responseData.push({
        value: formsSends,
        type: "number",
        name: "Formularios enviados",
      });

      return responseData;
    }

    throw new Error("Nenhum usuário encontrado");
  }
}

export { GetUserResumeService };
