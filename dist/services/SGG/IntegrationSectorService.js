"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationSectorService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class IntegrationSectorService {
  async execute({
    id,
    userId,
    company_id
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
        id: company_id
      }
    });
    if (!company) {
      throw new Error("Formulário não encontrado");
    }
    if (!company.sgg_id) {
      throw new Error("Vincule primeiro a empresa para depois vincular o setor");
    }
    const sector = await _prisma.default.companySector.findUnique({
      where: {
        id: id
      }
    });
    if (!sector) {
      throw new Error("Setor não encontrado");
    }
    if (sector.sgg_id) {
      throw new Error("Setor já vinculada ao SGG");
    }
    let error = "";
    let sggId = "";
    await _axios.default.post("https://app.sgg.net.br/api/v3/setor/", {
      id_empresa: company.sgg_id,
      setor: sector.name,
      descricao_ambiente: sector.description,
      localAmb: 1
    }, {
      auth: {
        username: process.env.SGG_USER || "",
        password: ""
      }
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
    await _prisma.default.companySector.update({
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
exports.IntegrationSectorService = IntegrationSectorService;