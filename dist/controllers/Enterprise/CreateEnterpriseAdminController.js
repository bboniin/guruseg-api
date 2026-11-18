"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEnterpriseAdminController = void 0;
var _CreateEnterpriseAdminService = require("../../services/Enterprise/CreateEnterpriseAdminService");
class CreateEnterpriseAdminController {
  async handle(req, res) {
    const {
      user_id,
      razao_social,
      nome_fantasia,
      document,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      type,
      sgg_id,
      employee_count,
      esocial_renewal
    } = req.body;
    const createEnterpriseAdminService = new _CreateEnterpriseAdminService.CreateEnterpriseAdminService();
    const enterprise = await createEnterpriseAdminService.execute({
      user_id,
      razao_social,
      nome_fantasia,
      document,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      type,
      sgg_id,
      employee_count: employee_count !== undefined ? Number(employee_count) : undefined,
      esocial_renewal: esocial_renewal !== undefined ? Boolean(esocial_renewal) : undefined
    });
    return res.json(enterprise);
  }
}
exports.CreateEnterpriseAdminController = CreateEnterpriseAdminController;