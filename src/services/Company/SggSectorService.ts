import prismaClient from "../../prisma";

interface SectorRequest {
  sector_id: string;
  sgg_id: string;
}

class SggSectorService {
  async execute({ sector_id, sgg_id }: SectorRequest) {
    if (!sgg_id) {
      throw new Error("Código SGG é obrigatorio");
    }

    const sectorGet = await prismaClient.companySector.findFirst({
      where: {
        id: sector_id,
      },
    });

    if (!sectorGet) {
      throw new Error("Formulário não encontrada");
    }

    const sector = await prismaClient.companySector.update({
      where: {
        id: sector_id,
      },
      data: {
        sgg_id: sgg_id,
      },
    });

    return sector;
  }
}

export { SggSectorService };
