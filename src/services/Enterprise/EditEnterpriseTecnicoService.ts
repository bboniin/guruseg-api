import prismaClient from "../../prisma";

interface EditEnterpriseTecnicoRequest {
  userId: string;
  id: string;
  user_id?: string;
  razao_social?: string;
  nome_fantasia?: string;
  ramo_atividade?: string;
  cep?: string;
  endereco?: string;
  nome_responsavel?: string;
  cpf_responsavel?: string;
  contato_responsavel?: string;
  observation?: string;
  sgg_id?: string;
  employee_count?: number;
  esocial_renewal?: boolean;
}

class EditEnterpriseTecnicoService {
  async execute({
    userId,
    id,
    user_id,
    razao_social,
    nome_fantasia,
    ramo_atividade,
    cep,
    endereco,
    nome_responsavel,
    cpf_responsavel,
    contato_responsavel,
    observation,
    sgg_id,
    employee_count,
    esocial_renewal,
  }: EditEnterpriseTecnicoRequest) {
    const isTecnic = await prismaClient.collaborator.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isTecnic) {
      throw new Error("Rota restrita para técnicos");
    }

    if (!id) {
      throw new Error("ID da empresa é obrigatório");
    }

    const enterpriseExists = await prismaClient.enterprise.findUnique({
      where: {
        id,
      },
    });

    if (!enterpriseExists) {
      throw new Error("Empresa não encontrada");
    }

    if (user_id) {
      const userExists = await prismaClient.user.findUnique({
        where: { id: user_id },
      });
      if (!userExists) {
        throw new Error("Usuário (Franqueado) informado não encontrado");
      }
    }

    const enterprise = await prismaClient.enterprise.update({
      where: {
        id,
      },
      data: {
        ...(user_id && { user_id }),
        razao_social,
        nome_fantasia,
        ramo_atividade,
        cep,
        endereco,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        observation,
        ...(sgg_id !== undefined && { sgg_id }),
        ...(employee_count !== undefined && { employee_count }),
        ...(esocial_renewal !== undefined && { esocial_renewal }),
        update_at: new Date(),
      },
      include: {
        user: true,
      },
    });

    return enterprise;
  }
}

export { EditEnterpriseTecnicoService };
