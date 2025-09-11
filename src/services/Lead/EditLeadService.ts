import prismaClient from "../../prisma";

interface LeadRequest {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  observation: string;
  employees: string;
  cnpj: string;
  necessity: string;
  location: string;
  value: number;
}

class EditLeadService {
  async execute({
    id,
    name,
    value,
    observation,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    employees,
  }: LeadRequest) {
    if (!name || !email || !phone_number) {
      throw new Error("Nome, email e telefone são obrigatórios");
    }

    const lead = await prismaClient.lead.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        value: value || 0,
        location: location,
        update_at: new Date(),
      },
    });

    return lead;
  }
}

export { EditLeadService };
