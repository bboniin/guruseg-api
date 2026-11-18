"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRiskCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    userId
  }) {
    if (!name || !type || !description || !fonte_geradora || !perigos || !probabilidade || !efeito || !epis || !epcs || !tipo_exposicao || !tempo_exposicao || !medidas_controle) {
      throw new Error("Preencha todas as informações do risco");
    }
    const tecnico = await _prisma.default.collaborator.findFirst({
      where: {
        id: userId
      }
    });
    if (!tecnico) {
      throw new Error("Rota restrita para tecnicos");
    }
    const companyGet = await _prisma.default.company.findFirst({
      where: {
        id: company_id
      }
    });
    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }
    const riskGet = await _prisma.default.companyScratchs.findFirst({
      where: {
        id: risk_id
      }
    });
    if (!riskGet) {
      throw new Error("Risco não encontrado");
    }
    const risk = _prisma.default.companyScratchs.update({
      where: {
        id: risk_id
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
        medidas_controle: medidas_controle
      }
    });
    return risk;
  }
}
exports.EditRiskCompanyService = EditRiskCompanyService;