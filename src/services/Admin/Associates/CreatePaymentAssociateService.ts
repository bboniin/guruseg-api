import prismaClient from "../../../prisma";

interface AssociateRequest {
  associate_id: string;
  description: string;
  value: number;
}

class CreatePaymentAssociateService {
  async execute({ description, associate_id, value }: AssociateRequest) {
    if (!value) {
      throw new Error("Valor é obrigatório");
    }

    const associate = await prismaClient.associate.findUnique({
      where: {
        id: associate_id,
      },
    });

    if (!associate) {
      throw new Error("Associado não encontrado");
    }

    const payment = await prismaClient.associatePayment.create({
      data: {
        description: description,
        value: value,
        associate_id: associate_id,
      },
    });

    return payment;
  }
}

export { CreatePaymentAssociateService };
