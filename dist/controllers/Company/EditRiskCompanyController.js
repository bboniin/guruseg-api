"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRiskCompanyController = void 0;
var _EditRiskCompanyService = require("../../services/Company/EditRiskCompanyService");
class EditRiskCompanyController {
  async handle(req, res) {
    const {
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
      company_id,
      medidas_controle
    } = req.body;
    const {
      risk_id
    } = req.params;
    const userId = req.userId;
    const editRiskCompanyService = new _EditRiskCompanyService.EditRiskCompanyService();
    const company = await editRiskCompanyService.execute({
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
      company_id,
      medidas_controle,
      userId,
      risk_id
    });
    return res.json(company);
  }
}
exports.EditRiskCompanyController = EditRiskCompanyController;