import prismaClient from "../../prisma";

interface CompanyRequest {
  company_id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  ramo_atividade: string;
  cep: string;
  userId: string;
  endereco: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  contato_responsavel: string;
  companySector: Array<[]>;
  deleteSector: Array<string>;
  deleteEmploye: Array<string>;
  type: string;
}

class EditCompanyService {
  async execute({
    company_id,
    razao_social,
    nome_fantasia,
    cnpj,
    ramo_atividade,
    cep,
    endereco,
    userId,
    nome_responsavel,
    cpf_responsavel,
    contato_responsavel,
    companySector,
    deleteSector,
    deleteEmploye,
    type,
  }: CompanyRequest) {
    let error = "";

    if (
      !razao_social ||
      companySector.length == 0 ||
      !endereco ||
      !ramo_atividade ||
      !cep ||
      !nome_fantasia ||
      !cnpj ||
      !type ||
      (type == "CAEPF" &&
        (!contato_responsavel || !cpf_responsavel || !nome_responsavel))
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
            error = `Preencha todos os campos da função ${i + 1} no setor ${index + 1}`;
          }
        });
        item["companyScratchs"].map((risk) => {
          if (
            !risk.name ||
            !risk.type ||
            !risk.description ||
            !risk.fonte_geradora ||
            !risk.perigos ||
            !risk.probabilidade ||
            !risk.efeito ||
            !risk.epis ||
            !risk.epcs ||
            !risk.tipo_exposicao ||
            !risk.tempo_exposicao
          ) {
            error = `Preencha o todas informações do risco ${risk.name} no setor ${index + 1}`;
          }
        });
      }
    });
    if (error) {
      throw new Error(error);
    }

    const companyGet = await prismaClient.company.findFirst({
      where: {
        id: company_id,
        collaborador_id: userId,
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
      throw new Error("Formulário não encontrada");
    }

    if (companyGet.status == "confirmado") {
      throw new Error("Formulário já preenchido pela empresa");
    }

    await prismaClient.companySector.deleteMany({
      where: {
        company_id: company_id,
        id: {
          in: deleteSector,
        },
      },
    });

    await prismaClient.companyEmployees.deleteMany({
      where: {
        id: {
          in: deleteEmploye,
        },
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
        type: type == "CAEPF" ? "CAEPF" : "CNPJ",
      },
    });

    companySector.map(async (item) => {
      let sector = {};
      if (item["id"]) {
        sector = await prismaClient.companySector.update({
          where: {
            id: item["id"],
          },
          data: {
            company_id: companyGet.id,
            name: item["name"],
            description: item["description"],
          },
        });
      } else {
        sector = await prismaClient.companySector.create({
          data: {
            company_id: companyGet.id,
            name: item["name"],
            description: item["description"],
          },
        });
      }

      item["companyEmployees"].map(async (data) => {
        if (data["id"]) {
          await prismaClient.companyEmployees.update({
            where: {
              id: data["id"],
            },
            data: {
              company_sector_id: sector["id"],
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
        } else {
          await prismaClient.companyEmployees.create({
            data: {
              company_sector_id: sector["id"],
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
        }
      });

      await prismaClient.companyScratchs.deleteMany({
        where: {
          company_sector_id: sector["id"],
        },
      });

      item["companyScratchs"].map(async (data) => {
        await prismaClient.companyScratchs.create({
          data: {
            company_sector_id: sector["id"],
            name: data["name"],
            type: data["type"],
            description: data["description"],
            fonte_geradora: data["fonte_geradora"],
            perigos: data["perigos"],
            probabilidade: data["probabilidade"],
            efeito: data["efeito"],
            tipo_exposicao: data["tipo_exposicao"],
            tempo_exposicao: data["tempo_exposicao"],
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

export { EditCompanyService };
