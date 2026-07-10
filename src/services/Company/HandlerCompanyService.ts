import prismaClient from "../../prisma";

interface CompanyRequest {
  observation: string;
  userId: string;
  company_id: string;
}

class HandlerCompanyService {
  async execute({ observation, userId, company_id }: CompanyRequest) {
    if (!observation || !userId || !company_id) {
      throw new Error("Deixa uma observação para o franqueado");
    }

    const companyGet = await prismaClient.company.findFirst({
      where: {
        id: company_id,
      },
    });

    const tecnico = await prismaClient.collaborator.findFirst({
      where: {
        id: userId,
      },
    });

    if (!tecnico) {
      throw new Error("Apenas o técnico pode solicitar alteração");
    }

    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }

    const company = await prismaClient.company.update({
      where: {
        id: company_id,
      },
      data: {
        observation: observation,
        status: "alteracao",
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
            status: "pendente",
            company_edited: true,
          },
        });
      }
    }

    return company;
  }
}

export { HandlerCompanyService };
