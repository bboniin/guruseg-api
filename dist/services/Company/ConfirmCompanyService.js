"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmCompanyService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    companySector
  }) {
    let error = "";

    if (!razao_social || companySector.length == 0 || !signature || !contato_responsavel || !cpf_responsavel || !nome_responsavel || !endereco || !ramo_atividade || !cep || !nome_fantasia || !cnpj) {
      error = "Preencha todos os campos da empresa.";
    }

    companySector.map((item, index) => {
      if (!error) {
        if (!item["name"] || !item["description"]) {
          error = `Preencha o nome e descrição do setor ${index + 1}`;
        }

        item["companyEmployees"].map((data, i) => {
          if (!data.name || !data.description || !data.epis || !data.cbo || !data.quantidade_colaboradores) {
            error = `Preencha o todos os campos da função ${i + 1} no setor ${index + 1}`;
          }
        });
        item["companyScratchs"].map(data => {
          if (!data.description) {
            error = `Preencha o observação do risco ${data.name} no setor ${index + 1}`;
          }
        });
      }
    });

    if (error) {
      throw new Error(error);
    }

    const companyGet = await _prisma.default.company.findUnique({
      where: {
        id: company_id
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc"
          },
          include: {
            companyEmployees: {
              orderBy: {
                create_at: "asc"
              }
            },
            companyScratchs: {
              orderBy: {
                create_at: "asc"
              }
            }
          }
        }
      }
    });

    if (!companyGet) {
      throw new Error("Empresa não encontrada");
    }

    if (companyGet.status == "confirmado") {
      throw new Error("Formulario já preenchido pela empresa");
    }

    await _prisma.default.companySector.deleteMany({
      where: {
        company_id: company_id
      }
    });
    const company = await _prisma.default.company.update({
      where: {
        id: company_id
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
        status: "confirmado"
      }
    });
    companySector.map(async item => {
      const sector = await _prisma.default.companySector.create({
        data: {
          company_id: companyGet.id,
          name: item["name"],
          description: item["description"]
        }
      });
      item["companyEmployees"].map(async data => {
        await _prisma.default.companyEmployees.create({
          data: {
            company_sector_id: sector.id,
            name: data["name"],
            description: data["description"],
            epis: data["epis"],
            cbo: data["cbo"],
            quantidade_colaboradores: parseInt(data["quantidade_colaboradores"]) || 0,
            quantidade_colaboradores_m: parseInt(data["quantidade_colaboradores_m"]) || 0,
            quantidade_colaboradores_f: parseInt(data["quantidade_colaboradores_f"]) || 0
          }
        });
      });
      item["companyScratchs"].map(async data => {
        await _prisma.default.companyScratchs.create({
          data: {
            company_sector_id: sector.id,
            name: data["name"],
            type: data["type"],
            description: data["description"]
          }
        });
      });
    });
    return company;
  }

}

exports.ConfirmCompanyService = ConfirmCompanyService;