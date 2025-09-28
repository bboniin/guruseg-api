import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface ResumeRequest {
  start_date: Date;
  end_date: Date;
  userId: string;
}

class GetCollaboratorResumeService {
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

    const collaborator = await prismaClient.collaborator.findUnique({
      where: {
        id: userId,
      },
    });

    if (collaborator) {
      const ordersCount = await prismaClient.order.count({
        where: { ...filterDate, collaborator_id: userId },
      });

      responseData.push({
        value: ordersCount,
        type: "number",
        name: "OS recebidas nesse periodo",
      });

      const ordersOpenCount = await prismaClient.order.count({
        where: {
          ...filterDate,

          status: {
            notIn: ["finalizado", "cancelado"],
          },
          collaborator_id: userId,
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
          collaborator_id: userId,
          status: "finalizado",
        },
      });

      responseData.push({
        value: ordersFinish,
        type: "number",
        name: "OS finalizadas nesse periodo",
      });

      return responseData;
    }

    throw new Error("Nenhum usuário encontrado");
  }
}

export { GetCollaboratorResumeService };
