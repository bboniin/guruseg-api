import prismaClient from "../../prisma";

interface ServiceRequest {
  userId: string;
}

class ListServicesClientService {
  async execute({ userId }: ServiceRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    let servicesFilter = [];

    if (user?.services) {
      user.services.split(";").map((item) => {
        if (item) {
          servicesFilter.push({
            id: item,
          });
        }
      });
    }

    const services = await prismaClient.service.findMany({
      where: user?.services
        ? {
            visible: true,
            OR: servicesFilter,
          }
        : {
            visible: true,
          },
      orderBy: {
        create_at: "asc",
      },
    });

    const assinaturaServices = [
      {
        id: "assinatura_pcmso",
        name: "Assinatura PCMSO",
        value: user?.value_pcmso,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
      {
        id: "assinatura_ltcat_atr",
        name: "Assinatura LTCAT com ART",
        value: user?.value_ltcat_atr,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
      {
        id: "assinatura_ltcat_medicor",
        name: "Assinatura LTCAT Assinatura medico ",
        value: user?.value_ltcat_medico,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
      {
        id: "assinatura_pgr_atr",
        name: "Assinatura PGR com ART",
        value: user?.value_pgr_atr,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
      {
        id: "assinatura_lip",
        name: "Assinatura LIP",
        value: user?.value_lip,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
      {
        id: "assinatura_li",
        name: "Assinatura LI",
        value: user?.value_li,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
      {
        id: "assinatura_lp",
        name: "Assinatura LP",
        value: user?.value_lp,
        comission: 1,
        sector: "Assinatura Documentos SST",
      },
    ];

    return {
      services: [
        ...services,
        ...assinaturaServices.filter((item) => item.value),
      ],
      balance: user?.balance || 0,
    };
  }
}

export { ListServicesClientService };
