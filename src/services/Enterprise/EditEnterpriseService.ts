import prismaClient from "../../prisma";

interface EditEnterpriseRequest {
  id: string;
  userId: string;
  razao_social?: string;
  nome_fantasia?: string;
  ramo_atividade?: string;
  cep?: string;
  endereco?: string;
  nome_responsavel?: string;
  cpf_responsavel?: string;
  contato_responsavel?: string;
  observation?: string;
}

class EditEnterpriseService {
  async execute({
    id,
    userId,
    razao_social,
    nome_fantasia,
    ramo_atividade,
    cep,
    endereco,
    nome_responsavel,
    cpf_responsavel,
    contato_responsavel,
    observation,
  }: EditEnterpriseRequest) {
    if (!id) {
      throw new Error("ID da empresa é obrigatório");
    }

    const enterpriseExists = await prismaClient.enterprise.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!enterpriseExists) {
      throw new Error("Empresa não encontrada ou permissão negada");
    }

    const enterprise = await prismaClient.enterprise.update({
      where: {
        id,
      },
      data: {
        razao_social,
        nome_fantasia,
        ramo_atividade,
        cep,
        endereco,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        observation,
        update_at: new Date(),
      },
    });

    return enterprise;
  }
}

export { EditEnterpriseService };
