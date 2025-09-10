import { addDays, format } from "date-fns";
import { api } from "../../config/api";
import prismaClient from "../../prisma";

interface DepositRequest {
  package_id: string;
  value: number;
  userId: string;
}

class CreateDepositService {
  async execute({ userId, package_id, value }: DepositRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    let deposit = {
      value: value,
      bonus: 0,
      name: "Pacote Personalizado",
      description: "",
    };

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (!user.costumer_id) {
      throw new Error("Cadastre seu CPF para efetuar pagamentos");
    }

    if (package_id) {
      const depositPackage = await prismaClient.depositPackage.findUnique({
        where: {
          id: package_id,
        },
      });

      if (!depositPackage) {
        throw new Error("Pacote não está mais disponivel para compra");
      }

      deposit = {
        value: depositPackage.value,
        name: depositPackage.name,
        description: depositPackage.description,
        bonus: depositPackage.bonus,
      };
    } else {
      if (!value) {
        throw new Error("Preencha o valor que deseja depositar");
      }
    }

    let responseDeposit;
    await api
      .post("/payments", {
        value: deposit.value,
        billingType: "PIX",
        customer: user.costumer_id,
        dueDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
      })
      .then(async (response) => {
        const payment = await prismaClient.payment.create({
          data: {
            asaas_id: response.data.id,
            value: deposit.value,
            user_id: userId,
            status: "pendente",
            type: "DEPOSIT",
            method: "PIX",
          },
        });

        const depositRes = await prismaClient.deposit.create({
          data: {
            value: deposit.value,
            name: deposit.name,
            description: deposit.description,
            status: "pendente",
            user_id: userId,
            bonus: deposit.bonus,
          },
        });

        const paymentEdit = await prismaClient.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            deposit_id: depositRes.id,
          },
        });

        await api
          .get(`/payments/${response.data.id}/pixQrCode`)
          .then(async (res) => {
            paymentEdit["pix"] = res.data;
            paymentEdit["deposit"] = depositRes;

            responseDeposit = paymentEdit;
          })
          .catch((e) => {
            throw new Error(
              "Ocorreu um gerar QR Code Pix, recarregue a página"
            );
          });
      })
      .catch((e) => {
        throw new Error("Ocorreu um erro ao criar cobrança");
      });

    return responseDeposit;
  }
}

export { CreateDepositService };
