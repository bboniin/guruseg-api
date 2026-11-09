import prismaClient from "../../prisma";

interface DeleteRequest {
  company_id: string;
  userId?: string;
}

class DeletePreliminaryCompanyService {
  async execute({ company_id, userId }: DeleteRequest) {
    if (!company_id) {
      throw new Error("ID do formulário não fornecido.");
    }

    const whereClause: any = { id: company_id };
    if (userId) {
      whereClause.collaborador_id = userId;
    }

    const companyGet = await prismaClient.preliminaryCompany.findFirst({
      where: whereClause,
    });

    if (!companyGet) {
      throw new Error("Formulário preliminar não encontrado.");
    }

    const deleted = await prismaClient.preliminaryCompany.delete({
      where: {
        id: company_id,
      },
    });

    return deleted;
  }
}

export { DeletePreliminaryCompanyService };
