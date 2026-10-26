import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface ServiceRequest {
  name: string;
  description: string;
  value: number;
  value_terceirize: number;
  id: string;
  commission: number;
  sector: string;
  min_collaborators: number;
  max_collaborators: number;

  required_company: boolean;
}

class EditServiceService {
  async execute({
    name,
    id,
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

    let data = {
      name: name,
      description: description,
      sector: sector,
      value: value,
      value_terceirize: value_terceirize,
      commission: commission,
      min_collaborators: min_collaborators,
      max_collaborators: max_collaborators,
      required_company: required_company,
    };

    const service = await prismaClient.service.update({
      where: {
        id: id,
      },
      data: data,
    });

    return service;
  }
}

export { EditServiceService };
