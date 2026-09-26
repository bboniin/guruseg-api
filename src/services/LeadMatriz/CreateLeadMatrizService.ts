import prismaClient from "../../prisma";

interface CreateLeadMatrizRequest {
  name: string;
  email?: string;
  phone_number?: string;
  observation?: string;
  employees?: string;
  cnpj?: string;
  value?: number;
  price?: number;
  necessity?: string;
  location?: string;
  status?: string;
  tag?: string;
  user_id?: string;
  contract_id?: string;
}

class CreateLeadMatrizService {
  async execute({
    name,
    email,
    phone_number,
    observation,
    employees,
    cnpj,
    value,
    price,
    necessity,
    location,
    status,
    tag,
    user_id,
    contract_id,
  }: CreateLeadMatrizRequest) {
    if (!name) {
      throw new Error("Nome do lead é obrigatório.");
    }

    const leadMatriz = await prismaClient.leadMatriz.create({
      data: {
        name,
        email,
        phone_number,
        observation,
        employees,
        cnpj,
        value: value || 0,
        price: price || 0,
        necessity,
        location,
        status: status || "Oportunidade",
        tag: tag || "Cadastrado",
        user_id,
        contract_id,
      },
    });

    return leadMatriz;
  }
}

export { CreateLeadMatrizService };
