"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditEnterpriseAdminController = void 0;
var _EditEnterpriseAdminService = require("../../services/Enterprise/EditEnterpriseAdminService");
class EditEnterpriseAdminController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      user_id,
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      sgg_id,
      employee_count,
      esocial_renewal
    } = req.body;
    const editEnterpriseAdminService = new _EditEnterpriseAdminService.EditEnterpriseAdminService();
    const enterprise = await editEnterpriseAdminService.execute({
      id,
      user_id,
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      sgg_id,
      employee_count: employee_count !== undefined ? Number(employee_count) : undefined,
      esocial_renewal: esocial_renewal !== undefined ? Boolean(esocial_renewal) : undefined
    });
    return res.json(enterprise);
  }
}
exports.EditEnterpriseAdminController = EditEnterpriseAdminController;