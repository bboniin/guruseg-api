import prismaClient from "../../prisma";

interface CreateEnterpriseRequest {
  userId: string;
  razao_social: string;
  nome_fantasia: string;
  document: string;
  ramo_atividade?: string;
  cep?: string;
  endereco?: string;
  nome_responsavel?: string;
  cpf_responsavel?: string;
  contato_responsavel?: string;
  observation?: string;
  type: string;
  sgg_id?: string;
  employee_count?: number;
  esocial_renewal?: boolean;
}

class CreateEnterpriseService {
  async execute({
    userId,
    razao_social,
    nome_fantasia,
    document,
    ramo_atividade,
    cep,
    endereco,
    nome_responsavel,
    cpf_responsavel,
    contato_responsavel,
    observation,
    type,
    sgg_id,
    employee_count,
    esocial_renewal,
  }: CreateEnterpriseRequest) {
    if (!userId) {
      throw new Error("Usuário é obrigatório");
    }

    const userExists = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    const enterprise = await prismaClient.enterprise.create({
      data: {
        user_id: userId,
        razao_social: razao_social || "",
        nome_fantasia: nome_fantasia || razao_social || "",
        document: document,
        ramo_atividade,
        cep,
        endereco,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        observation,
        type: type || "CNPJ",
        sgg_id,
        employee_count,
        esocial_renewal,
      },
    });

    return enterprise;
  }
}

export { CreateEnterpriseService };
