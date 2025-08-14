import { api } from "../../config/api";
import { validateCpf } from "../../config/functions";
import prismaClient from "../../prisma";

interface PaymentRequest {
  cpf: number;
  userId: string;
}
class CreateCustomerService {
  async execute({ cpf, userId }: PaymentRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
        type: "cliente",
      },
    });

    if (!validateCpf(cpf)) {
      throw new Error("CPF inválido");
    }

    if (!user) {
      throw new Error("Franqueado não encontrado");
    }

    if (user.costumer_id) {
      throw new Error("Franqueado já cadastrou CPF");
    }
    let costumer_id = "";

    await api
      .post("/customers", {
        name: user.name,
        cpfCnpj: cpf,
        mobilePhone: user.phone_number,
      })
      .then(async (response) => {
        costumer_id = response.data.id;
        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            costumer_id: costumer_id,
          },
        });
      })
      .catch((e) => {
        throw new Error("Ocorreu um erro ao criar cobrança");
      });

    return costumer_id;
  }
}

export { CreateCustomerService };
