"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEnterpriseController = void 0;
var _CreateEnterpriseService = require("../../services/Enterprise/CreateEnterpriseService");
class CreateEnterpriseController {
  async handle(req, res) {
    const {
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
    const userId = req.userId;
    const createEnterpriseService = new _CreateEnterpriseService.CreateEnterpriseService();
    const enterprise = await createEnterpriseService.execute({
      userId,
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
exports.CreateEnterpriseController = CreateEnterpriseController;