"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationCompanyService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class IntegrationCompanyService {
  async execute({
    id,
    userId
  }) {
    const collaborator = await _prisma.default.collaborator.findUnique({
      where: {
        id: userId
      }
    });
    if (!collaborator) {
      throw new Error("Técnico não encontrado");
    }
    const company = await _prisma.default.company.findUnique({
      where: {
        id: id
      }
    });
    if (!company) {
      throw new Error("Formulário não encontrado");
    }
    if (company.sgg_id) {
      throw new Error("Empresa já vinculada ao SGG");
    }
    let error = "";
    let sggId = "";
    await _axios.default.post("https://app.sgg.net.br/api/v3/empresa/", {
      fantasia: company.nome_fantasia,
      nome: company.razao_social,
      ...(company.type === "CNPJ" ? {
        CNPJ: company.cnpj
      } : {
        CPF: company.cpf_responsavel,
        tipo_especifico: "CAEPF",
        valor_tipo_especifico: company.cnpj
      }),
      ...((company.type === "CNPJ" && company.nome_responsavel && company.cpf_responsavel || company.type === "CAEPF") && {
        responsaveis: [{
          CPF: company.cpf_responsavel,
          nome: company.nome_responsavel
        }]
      })
    }, {
      auth: {
        username: process.env.SGG_USER || "",
        password: ""
      },
      responseType: "json"
    }).then(response => {
      const returnJSON = JSON.parse(response.data.replace(/"({.*?})"/g, (match, p1) => {
        return JSON.stringify(p1);
      }));
      const returnData = JSON.parse(returnJSON.returnInfo);
      if (returnData.erro) {
        error = returnData.msg;
        throw new Error(returnData.msg);
      }
      sggId = returnData.id;
    }).catch(error => {
      error = error.message || "Ocorreu um erro inesperado, contate o suporte";
    });
    if (error) {
      throw new Error(error);
    }
    await _prisma.default.company.update({
      where: {
        id: id
      },
      data: {
        sgg_id: sggId
      }
    });
    return 200;
  }
}
exports.IntegrationCompanyService = IntegrationCompanyService;