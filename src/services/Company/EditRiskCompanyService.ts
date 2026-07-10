import prismaClient from "../../prisma";

interface CompanyRequest {
  company_id: string;
  userId: string;
  risk_id: string;
  name: string;
  type: string;
  description: string;
  fonte_geradora: string;
  perigos: string;
  probabilidade: string;
  efeito: string;
  epcs: string;
  epis: string;
  tipo_exposicao: string;
  tempo_exposicao: string;
  medidas_controle: string;
}

class EditRiskCompanyService {
  async execute({
    company_id,
    name,
    type,
    description,
    fonte_geradora,
    perigos,
    probabilidade,
    efeito,
    epcs,
    epis,
    tipo_exposicao,
    tempo_exposicao,
    risk_id,
    medidas_controle,
    userId,
  }: CompanyRequest) {
    if (
      !name ||
      !type ||
      !description ||
      !fonte_geradora ||
      !perigos ||
      !probabilidade ||
      !efeito ||
      !epis ||
      !epcs ||
      !tipo_exposicao ||
      !tempo_exposicao ||
      !medidas_controle
    ) {
      throw new Error("Preencha todas as informações do risco");
    }

    const tecnico = await prismaClient.collaborator.findFirst({
      where: { id: userId },
    });

    if (!tecnico) {
      throw new Error("Rota restrita para tecnicos");
    }

    const companyGet = await prismaClient.company.findFirst({
      where: { id: company_id },
    });

    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }

    const riskGet = await prismaClient.companyScratchs.findFirst({
      where: { id: risk_id },
    });

    if (!riskGet) {
      throw new Error("Risco não encontrado");
    }

    const risk = prismaClient.companyScratchs.update({
      where: {
        id: risk_id,
      },
      data: {
        name: name,
        type: type,
        description: description,
        fonte_geradora: fonte_geradora,
        perigos: perigos,
        probabilidade: probabilidade,
        efeito: efeito,
        tipo_exposicao: tipo_exposicao,
        tempo_exposicao: tempo_exposicao,
        epis: epis,
        epcs: epcs,
        medidas_controle: medidas_controle,
      },
    });

    return risk;
  }
}

export { EditRiskCompanyService };
