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

    if (company.order_id) {
      const order = await prismaClient.order.findUnique({
        where: {
          id: company.order_id,
        },
      });
      if (order) {
        await prismaClient.order.update({
          where: {
            id: company.order_id,
          },
          data: {
            status: order.is_finished ? "alteracao" : "andamento",
            company_edited: false,
          },
        });
      }
    }

    return company;
  }
}

export { ConfirmCompanyService };
