import prismaClient from "../../prisma";

interface EditLeadMatrizRequest {
  id: string;
  name?: string;
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

class EditLeadMatrizService {
  async execute({
    id,
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
  }: EditLeadMatrizRequest) {
    if (!id) {
      throw new Error("ID do lead é obrigatório.");
    }

    const leadExists = await prismaClient.leadMatriz.findUnique({
      where: { id },
    });

    if (!leadExists) {
      throw new Error("Lead da matriz não encontrado.");
    }

    const leadMatriz = await prismaClient.leadMatriz.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone_number !== undefined && { phone_number }),
        ...(observation !== undefined && { observation }),
        ...(employees !== undefined && { employees }),
        ...(cnpj !== undefined && { cnpj }),
        ...(value !== undefined && { value }),
        ...(price !== undefined && { price }),
        ...(necessity !== undefined && { necessity }),
        ...(location !== undefined && { location }),
        ...(status !== undefined && { status }),
        ...(tag !== undefined && { tag }),
        ...(user_id !== undefined && { user_id }),
        ...(contract_id !== undefined && { contract_id }),
        update_at: new Date(),
      },
    });

    return leadMatriz;
  }
}

export { EditLeadMatrizService };
