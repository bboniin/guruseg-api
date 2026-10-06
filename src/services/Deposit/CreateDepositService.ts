import { addDays, format } from "date-fns";
import { api } from "../../config/api";
import prismaClient from "../../prisma";
import { CreateCustomerService } from "../Payment/CreateCustomerService";
import { validateCpf } from "../../config/functions";

interface DepositRequest {
  package_id: string;
  value: number;
  userId: string;
  cpf: string;
}

class CreateDepositService {
  async execute({ userId, value, package_id, cpf }: DepositRequest) {
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
        id: package_id || "",
      },
    });

    if (!depositPackage && !value) {
      throw new Error("Pacote não está mais disponivel para compra");
    }

    const valueDeposit = value || depositPackage.value;

    if (valueDeposit < 10) {
      throw new Error("Valor minimo para depósito é R$ 10,00");
    }

    let responseDeposit;
    await api
      .post("/payments", {
        value: valueDeposit,
        billingType: "PIX",
        customer: user.costumer_id,
        dueDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
      })
      .then(async (response) => {
        const payment = await prismaClient.payment.create({
          data: {
            asaas_id: response.data.id,
            value: valueDeposit,
            user_id: userId,
            status: "pendente",
            type: "DEPOSIT",
            method: "PIX",
          },
        });

        const depositRes = await prismaClient.deposit.create({
          data: {
            value: valueDeposit,
            name: depositPackage?.name || "Depósito Personalizado",
            description: depositPackage?.description || "",
            status: "pendente",
            user_id: userId,
            type: depositPackage?.type || "services",
            bonus: depositPackage?.bonus || 0,
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
              "Ocorreu um gerar QR Code Pix, recarregue a página",
            );
          });
      })
      .catch((e) => {
        console.log(e);
        throw new Error("Ocorreu um erro ao criar cobrança");
      });

    return responseDeposit;
  }
}

export { CreateDepositService };
