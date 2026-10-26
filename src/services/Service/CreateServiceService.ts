import prismaClient from "../../prisma";

interface ServiceRequest {
  name: string;
  description: string;
  value: number;
  value_terceirize: number;
  commission: number;
  sector: string;
  min_collaborators: number;
  max_collaborators: number;
  required_company: boolean;
}

class CreateServiceService {
  async execute({
    name,
    description,
    value,
    value_terceirize,
    min_collaborators,
    max_collaborators,
    commission,
    sector,
    required_company,
  }: ServiceRequest) {
    if (!name || (!value && !value_terceirize) || !commission || !sector) {
      throw new Error("Nome, valor, setor e comissão é obrigatório");
    }

    const service = await prismaClient.service.create({
      data: {
        name: name,
        value: Number(value),
        value_terceirize: Number(value_terceirize),
        commission: Number(commission),
        visible: true,
        description: description,
        sector: sector,
        min_collaborators: min_collaborators,
        max_collaborators: max_collaborators,
        required_company: required_company,
      },
    });

    return service;
  }
}

export { CreateServiceService };
