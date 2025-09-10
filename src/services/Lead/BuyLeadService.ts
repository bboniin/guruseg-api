import prismaClient from "../../prisma";

interface LeadRequest {
  userId: string;
  lead_id: string;
}

class BuyLeadService {
  async execute({ lead_id, userId }: LeadRequest) {
    if (!userId || !lead_id) {
      throw new Error("Id do Franqueado e Id do lead são obrigatórios");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Franqueado não foi encontrado");
    }

    const leadMaster = await prismaClient.leadMaster.findUnique({
      where: {
        id: lead_id,
      },
    });

    if (!leadMaster) {
      throw new Error("Lead não está mais disponível para compra");
    }

    if (leadMaster.price > user.balance) {
      throw new Error(
        "Saldo insuficiente para comprar o Lead, efetue um deposito para continuar"
      );
    }

    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: user.balance - leadMaster.price,
      },
    });

    const lead = prismaClient.lead.create({
      data: {
        name: leadMaster.name,
        value: leadMaster.value,
        price: leadMaster.price,
        tag: leadMaster.tag,
        necessity: leadMaster.necessity,
        phone_number: leadMaster.phone_number,
        email: leadMaster.email,
        cnpj: leadMaster.cnpj,
        employees: leadMaster.employees,
        location: leadMaster.location,
        user_id: userId,
        lead_id: leadMaster.id,
        observation: leadMaster.observation,
      },
    });

    await prismaClient.payment.create({
      data: {
        value: leadMaster.price,
        lead_id: leadMaster.id,
        status: "confirmado",
        method: "SALDO",
        type: "LEAD",
        user_id: userId,
      },
    });

    return lead;
  }
}

export { BuyLeadService };
