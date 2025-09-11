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
  price: number;
  value: number;
}

class EditLeadMasterService {
  async execute({
    id,
    name,
    value,
    price,
    observation,
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
        if (leadMaster.id != id) {
          throw new Error("Email já está em uso");
        }
      }
    }

    const lead = await prismaClient.leadMaster.update({
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
        location: location,
        price: price || 0,
        value: value || 0,
        update_at: new Date(),
      },
    });

    return lead;
  }
}

export { EditLeadMasterService };
