import prismaClient from "../../prisma";

interface DepositRequest {
  collaborator_id: string;
  userId: string;
  value: number;
  bonus: number;
  description: string;
  operation: string;
  type: string;
}

class CreateDepositAdminService {
  async execute({
    userId,
    collaborator_id,
    bonus,
    description,
    value,
    operation,
    type,
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

    if (operation == "saida") {
      value *= -1;
      bonus *= -1;
    }

    const deposit = await prismaClient.deposit.create({
      data: {
        value: value,
        name: operation == "saida" ? "Retirada de Saldo" : "Envio de Saldo",
        description: description,
        status: "confirmado",
        user_id: collaborator_id,
        bonus: bonus,
        type: type,
      },
    });

    if (type == "services") {
      await prismaClient.user.update({
        where: {
          id: collaborator_id,
        },
        data: {
          balance: parseFloat((user.balance + value + bonus).toFixed(2)),
        },
      });
    } else {
      await prismaClient.user.update({
        where: {
          id: collaborator_id,
        },
        data: {
          balance_leads: parseFloat(
            (user.balance_leads + value + bonus).toFixed(2),
          ),
        },
      });
    }

    return deposit;
  }
}

export { CreateDepositAdminService };
