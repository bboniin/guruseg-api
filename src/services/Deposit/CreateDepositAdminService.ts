import prismaClient from "../../prisma";

interface DepositRequest {
  collaborator_id: string;
  userId: string;
  value: number;
  bonus: number;
  description: string;
  type: string;
}

class CreateDepositAdminService {
  async execute({
    userId,
    collaborator_id,
    bonus,
    description,
    value,
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

    if (type == "saida") {
      value *= -1;
      bonus *= -1;
    }

    const deposit = await prismaClient.deposit.create({
      data: {
        value: value,
        name: type == "saida" ? "Retirada de Saldo" : "Envio de Saldo",
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
