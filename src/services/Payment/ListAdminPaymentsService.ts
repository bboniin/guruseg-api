import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface PaymentRequest {
  userId: string;
  startDate: string;
  endDate: string;
  method: string;
  user_id: string;
  status: string;
  type: string;
  page: number;
}

class ListAdminPaymentsService {
  async execute({
    userId,
    page,
    startDate,
    endDate,
    method,
    user_id,
    status,
    type,
  }: PaymentRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    let filter = {};

    if (status) {
      filter["status"] = status;
    }
    if (method) {
      filter["method"] = method;
    }
    if (user_id) {
      filter["user_id"] = user_id;
    }
    if (type) {
      filter["type"] = type;
    }

    if (startDate) {
      filter["create_at"] = {
        gte: startOfDay(new Date(startDate)),
        lte: endOfDay(new Date(endDate)),
      };
    }

    const paymentsTotal = await prismaClient.payment.findMany({
      where: filter,
    });

    const payments = await prismaClient.payment.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc",
      },
    });

    const totalValue = paymentsTotal.reduce(
      (sum, transaction) => sum + transaction.value,
      0,
    );

    return { payments, paymentsTotal: paymentsTotal.length, totalValue };
  }
}

export { ListAdminPaymentsService };
