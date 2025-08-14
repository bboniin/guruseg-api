import prismaClient from "../../prisma";

interface CompanyRequest {
  company_id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  ramo_atividade: string;
  cep: string;
  endereco: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  contato_responsavel: string;
  signature: string;
  companySector: Array<[]>;
}

class ConfirmCompanyService {
  async execute({
    company_id,
    razao_social,
    nome_fantasia,
    cnpj,
    ramo_atividade,
    cep,
    endereco,
    nome_responsavel,
    cpf_responsavel,
    contato_responsavel,
    signature,
    companySector,
  }: CompanyRequest) {
    let error = "";

    if (
      !razao_social ||
      companySector.length == 0 ||
      !signature ||
      !contato_responsavel ||
      !cpf_responsavel ||
      !nome_responsavel ||
      !endereco ||
      !ramo_atividade ||
      !cep ||
      !nome_fantasia ||
      !cnpj
    ) {
      error = "Preencha todos os campos do Formulário.";
    }

    companySector.map((item, index) => {
      if (!error) {
        if (!item["name"] || !item["description"]) {
          error = `Preencha o nome e descrição do setor ${index + 1}`;
        }
        item["companyEmployees"].map((data, i) => {
          if (
            !data.name ||
            !data.description ||
            !data.epis ||
            !data.cbo ||
            !data.quantidade_colaboradores
          ) {
            error = `Preencha o todos os campos da função ${i + 1} no setor ${index + 1}`;
          }
        });
        item["companyScratchs"].map((data) => {
          if (!data.description) {
            error = `Preencha o observação do risco ${data.name} no setor ${index + 1}`;
          }
        });
      }
    });
    if (error) {
      throw new Error(error);
    }

    const companyGet = await prismaClient.company.findUnique({
      where: {
        id: company_id,
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc",
          },
          include: {
            companyEmployees: {
              orderBy: {
                create_at: "asc",
              },
            },
            companyScratchs: {
              orderBy: {
                create_at: "asc",
              },
            },
          },
        },
      },
    });

    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }

    if (companyGet.status == "confirmado") {
      throw new Error("Formulário já preenchido pela empresa");
    }

    await prismaClient.companySector.deleteMany({
      where: {
        company_id: company_id,
      },
    });

    const company = await prismaClient.company.update({
      where: {
        id: company_id,
      },
      data: {
        razao_social: razao_social,
        nome_fantasia: nome_fantasia,
        cnpj: cnpj,
        ramo_atividade: ramo_atividade,
        cep: cep,
        endereco: endereco,
        nome_responsavel: nome_responsavel,
        cpf_responsavel: cpf_responsavel,
        contato_responsavel: contato_responsavel,
        signature: signature,
        signature_date: new Date(),
        status: "confirmado",
      },
    });

    companySector.map(async (item) => {
      const sector = await prismaClient.companySector.create({
        data: {
          company_id: companyGet.id,
          name: item["name"],
          description: item["description"],
        },
      });
      item["companyEmployees"].map(async (data) => {
        await prismaClient.companyEmployees.create({
          data: {
            company_sector_id: sector.id,
            name: data["name"],
            description: data["description"],
            epis: data["epis"],
            cbo: data["cbo"],
            quantidade_colaboradores:
              parseInt(data["quantidade_colaboradores"]) || 0,
            quantidade_colaboradores_m:
              parseInt(data["quantidade_colaboradores_m"]) || 0,
            quantidade_colaboradores_f:
              parseInt(data["quantidade_colaboradores_f"]) || 0,
          },
        });
      });

      item["companyScratchs"].map(async (data) => {
        await prismaClient.companyScratchs.create({
          data: {
            company_sector_id: sector.id,
            name: data["name"],
            type: data["type"],
            description: data["description"],
            fonte_geradora: data["fonte_geradora"],
            perigos: data["perigos"],
            avaliacao_risco: data["avaliacao_risco"],
            epis: data["epis"],
            epcs: data["epcs"],
            medidas_controle: data["medidas_controle"],
          },
        });
      });
    });

    return company;
  }
}

export { ConfirmCompanyService };
