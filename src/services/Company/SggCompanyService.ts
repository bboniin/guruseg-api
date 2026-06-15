import prismaClient from "../../prisma";

interface CompanyRequest {
  company_id: string;
  sgg_id: string;
  userId: string;
}

class SggCompanyService {
  async execute({ company_id, sgg_id, userId }: CompanyRequest) {
    if (!sgg_id) {
      throw new Error("Código SGG é obrigatorio");
    }

    const companyGet = await prismaClient.company.findFirst({
      where: {
        id: company_id,
        collaborador_id: userId,
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc",
          },
          include: {
            companyEmployees: {
              orderBy: {
                create_at: "asc",
              },
            },
            companyScratchs: {
              orderBy: {
                create_at: "asc",
              },
            },
          },
        },
      },
    });

    if (!companyGet) {
      throw new Error("Formulário não encontrada");
    }

    const company = await prismaClient.company.update({
      where: {
        id: company_id,
      },
      data: {
        sgg_id: sgg_id,
      },
    });

    return company;
  }
}

export { SggCompanyService };
