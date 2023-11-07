"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmCompanyController = void 0;

var _ConfirmCompanyService = require("../../services/Company/ConfirmCompanyService");

class ConfirmCompanyController {
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
      signature,
      companySector
    } = req.body;
    const {
      company_id
    } = req.params;
    const confirmCompanyService = new _ConfirmCompanyService.ConfirmCompanyService();
    const company = await confirmCompanyService.execute({
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
      signature,
      companySector
    });
    return res.json(company);
  }

}

exports.ConfirmCompanyController = ConfirmCompanyController;