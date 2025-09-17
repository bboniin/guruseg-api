import { addDays, format } from "date-fns";
import { api } from "../../config/api";
import prismaClient from "../../prisma";
import { CreateCustomerService } from "../Payment/CreateCustomerService";
import { validateCpf } from "../../config/functions";

interface DepositRequest {
  package_id: string;
  userId: string;
  cpf: string;
}

class CreateDepositService {
  async execute({ userId, package_id, cpf }: DepositRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (!user.costumer_id) {
      if (cpf) {
        if (!validateCpf(cpf)) {
          throw new Error("CPF inválido");
        }

        const createCustomerService = new CreateCustomerService();

        const costumer_id = await createCustomerService.execute({
          userId,
          cpf,
        });

        user.costumer_id = costumer_id;
      } else {
        throw new Error("Franqueado não cadastrou CPF para nota fiscal");
      }
    }

    const depositPackage = await prismaClient.depositPackage.findUnique({
      where: {
        id: package_id,
      },
    });

    if (!depositPackage) {
      throw new Error("Pacote não está mais disponivel para compra");
    }

    let responseDeposit;
    await api
      .post("/payments", {
        value: depositPackage.value,
        billingType: "PIX",
        customer: user.costumer_id,
        dueDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
      })
      .then(async (response) => {
        const payment = await prismaClient.payment.create({
          data: {
            asaas_id: response.data.id,
            value: depositPackage.value,
            user_id: userId,
            status: "pendente",
            type: "DEPOSIT",
            method: "PIX",
          },
        });

        const depositRes = await prismaClient.deposit.create({
          data: {
            value: depositPackage.value,
            name: depositPackage.name,
            description: depositPackage.description,
            status: "pendente",
            user_id: userId,
            bonus: depositPackage.bonus,
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
