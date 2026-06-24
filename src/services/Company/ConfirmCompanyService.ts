import prismaClient from "../../prisma";

interface CompanyRequest {
  company_id: string;
}

class ConfirmCompanyService {
  async execute({ company_id }: CompanyRequest) {
    const companyGet = await prismaClient.company.findUnique({
      where: {
        id: company_id,
      },
    });

    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }

    if (companyGet.status == "confirmado") {
      throw new Error("Formulário já confirmado");
    }

    const company = await prismaClient.company.update({
      where: {
        id: company_id,
      },
      data: {
        status: "confirmado",
      },
    });

    return company;
  }
}

export { ConfirmCompanyService };
