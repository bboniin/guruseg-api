import { addDays, format } from "date-fns";
import { api } from "../../config/api";
import prismaClient from "../../prisma";
import { CreateCustomerService } from "../Payment/CreateCustomerService";

interface DepositRequest {
  collaborator_id: string;
  userId: string;
  value: number;
  bonus: number;
  description: string;
}

class CreateDepositAdminService {
  async execute({
    userId,
    collaborator_id,
    bonus,
    description,
    value,
  }: DepositRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: collaborator_id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const deposit = await prismaClient.deposit.create({
      data: {
        value: value,
        name: "Envio de Saldo",
        description: description,
        status: "confirmado",
        user_id: collaborator_id,
        bonus: bonus,
      },
    });

    await prismaClient.user.update({
      where: {
        id: collaborator_id,
      },
      data: {
        balance: parseFloat((user.balance + value).toFixed(2)),
        bonus: parseFloat((user.bonus + bonus).toFixed(2)),
      },
    });

    return deposit;
  }
}

export { CreateDepositAdminService };
