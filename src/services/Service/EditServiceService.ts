import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface ServiceRequest {
  name: string;
  description: string;
  value: number;
  id: string;
  commission: number;
  sector: string;
  min_collaborators: number;
  max_collaborators: number;
}

class EditServiceService {
  async execute({
    name,
    id,
    description,
    value,
    min_collaborators,
    max_collaborators,
    commission,
    sector,
  }: ServiceRequest) {
    if (!name || !value || !commission || !sector) {
      throw new Error("Nome, valor, setor e comissão é obrigatório");
    }

    let data = {
      name: name,
      description: description,
      sector: sector,
      value: value,
      commission: commission,
      min_collaborators: min_collaborators,
      max_collaborators: max_collaborators,
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
