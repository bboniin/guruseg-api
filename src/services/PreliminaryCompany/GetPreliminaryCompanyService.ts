import prismaClient from "../../prisma";

interface GetRequest {
  company_id: string;
}

class GetPreliminaryCompanyService {
  async execute({ company_id }: GetRequest) {
    if (!company_id) {
      throw new Error("ID do formulário não fornecido.");
    }

    const preliminaryCompany = await prismaClient.preliminaryCompany.findUnique({
      where: {
        id: company_id,
      },
      include: {
        functions: {
          orderBy: {
            create_at: "asc",
          },
        },
      },
    });

    if (!preliminaryCompany) {
      throw new Error("Formulário preliminar não encontrado.");
    }

    return preliminaryCompany;
  }
}

export { GetPreliminaryCompanyService };
