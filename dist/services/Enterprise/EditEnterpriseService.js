"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditEnterpriseService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditEnterpriseService {
  async execute({
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
  }) {
    if (!id) {
      throw new Error("ID da empresa é obrigatório");
    }
    const enterpriseExists = await _prisma.default.enterprise.findFirst({
      where: {
        id,
        user_id: userId
      }
    });
    if (!enterpriseExists) {
      throw new Error("Empresa não encontrada ou permissão negada");
    }
    const enterprise = await _prisma.default.enterprise.update({
      where: {
        id
      },
      data: {
        razao_social,
        nome_fantasia,
        ramo_atividade,
        cep,
        endereco,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        observation,
        update_at: new Date()
      }
    });
    return enterprise;
  }
}
exports.EditEnterpriseService = EditEnterpriseService;