import prismaClient from "../../prisma";

interface LeadRequest {
  name: string;
  email: string;
  phone_number: string;
  observation: string;
  employees: string;
  cnpj: string;
  necessity: string;
  location: string;
  tag: string;
}

class CreateLeadWebService {
  async execute({
    name,
    observation,
    tag,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    employees,
  }: LeadRequest) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }

    if (email) {
      const leadMaster = await prismaClient.leadMaster.findFirst({
        where: {
          email: email,
        },
      });

      if (leadMaster) {
        throw new Error("Email já está em uso");
      }
    }

    const lead = await prismaClient.leadMaster.create({
      data: {
        name: name,
        value: 0,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        price: 0,
        tag: tag,
        location: location,
      },
    });

    return lead;
  }
}

export { CreateLeadWebService };
