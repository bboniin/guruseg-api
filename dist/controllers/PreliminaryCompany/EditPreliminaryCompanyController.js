"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPreliminaryCompanyController = void 0;
var _EditPreliminaryCompanyService = require("../../services/PreliminaryCompany/EditPreliminaryCompanyService");
class EditPreliminaryCompanyController {
  async handle(req, res) {
    const company_id = req.params.company_id || req.params.id;
    const {
      razao_social,
      nome_fantasia,
      cnpj,
      type,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      status,
      functions,
      deleteFunctions
    } = req.body;
    const editService = new _EditPreliminaryCompanyService.EditPreliminaryCompanyService();
    const result = await editService.execute({
      company_id,
      razao_social,
      nome_fantasia,
      cnpj,
      type,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      status,
      functions,
      deleteFunctions
    });
    return res.json(result);
  }
}
exports.EditPreliminaryCompanyController = EditPreliminaryCompanyController;