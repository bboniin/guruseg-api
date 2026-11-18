"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCompanyController = void 0;
var _EditCompanyService = require("../../services/Company/EditCompanyService");
class EditCompanyController {
  async handle(req, res) {
    const {
      razao_social,
      nome_fantasia,
      cnpj,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      companySector,
      type,
      deleteSector,
      deleteEmploye
    } = req.body;
    const {
      company_id
    } = req.params;
    const editCompanyService = new _EditCompanyService.EditCompanyService();
    const company = await editCompanyService.execute({
      company_id: company_id,
      razao_social,
      nome_fantasia,
      cnpj,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      companySector,
      type,
      deleteSector,
      deleteEmploye
    });
    return res.json(company);
  }
}
exports.EditCompanyController = EditCompanyController;