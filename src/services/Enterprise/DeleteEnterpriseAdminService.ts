import prismaClient from "../../prisma";

interface DeleteEnterpriseAdminRequest {
  id: string;
}

class DeleteEnterpriseAdminService {
  async execute({ id }: DeleteEnterpriseAdminRequest) {
    if (!id) {
      throw new Error("ID da empresa é obrigatório");
    }

    const enterpriseExists = await prismaClient.enterprise.findFirst({
      where: {
        id,
        visible: true,
      },
    });

    if (!enterpriseExists) {
      throw new Error("Empresa não encontrada");
    }

    const enterprise = await prismaClient.enterprise.update({
      where: {
        id,
      },
      data: {
        visible: false,
      },
    });

    return enterprise;
  }
}

export { DeleteEnterpriseAdminService };
