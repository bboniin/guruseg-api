import prismaClient from "../../prisma";

interface LeadRequest {
  name: string;
  email: string;
  price: number;
  value: number;
  phone_number: string;
  observation: string;
  employees: string;
  cnpj: string;
  necessity: string;
  location: string;
  associate_id: string;
}

class CreateLeadMasterService {
  async execute({
    name,
    observation,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    price,
    employees,
    value,
    associate_id,
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

    let user_id = "";

    if (associate_id) {
      const associate = await prismaClient.associate.findUnique({
        where: {
          id: associate_id,
        },
      });

      user_id = associate.user_id;
    }

    const lead = await prismaClient.leadMaster.create({
      data: {
        name: name,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        value: value || 0,
        price: price || 0,
        location: location,
        tag: associate_id ? "Associado" : "Cadastrado",
        associate_id: associate_id,
      },
    });

    if (user_id) {
      await prismaClient.lead.create({
        data: {
          name: name,
          email: email,
          phone_number: phone_number,
          observation: observation,
          employees: employees,
          necessity: necessity,
          cnpj: cnpj,
          value: value || 0,
          price: price || 0,
          location: location,
          tag: associate_id ? "Associado" : "Cadastrado",
          lead_id: lead.id,
          user_id: user_id,
        },
      });
    }

    return lead;
  }
}

export { CreateLeadMasterService };
