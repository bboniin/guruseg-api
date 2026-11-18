"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditEnterpriseController = void 0;
var _EditEnterpriseService = require("../../services/Enterprise/EditEnterpriseService");
class EditEnterpriseController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation
    } = req.body;
    const userId = req.userId;
    const editEnterpriseService = new _EditEnterpriseService.EditEnterpriseService();
    const enterprise = await editEnterpriseService.execute({
      id,
      userId,
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation
    });
    return res.json(enterprise);
  }
}
exports.EditEnterpriseController = EditEnterpriseController;