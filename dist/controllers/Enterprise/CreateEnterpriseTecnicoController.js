"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEnterpriseTecnicoController = void 0;
var _CreateEnterpriseTecnicoService = require("../../services/Enterprise/CreateEnterpriseTecnicoService");
class CreateEnterpriseTecnicoController {
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
    const userId = req.userId;
    const createEnterpriseTecnicoService = new _CreateEnterpriseTecnicoService.CreateEnterpriseTecnicoService();
    const enterprise = await createEnterpriseTecnicoService.execute({
      userId,
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
exports.CreateEnterpriseTecnicoController = CreateEnterpriseTecnicoController;