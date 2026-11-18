"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEnterpriseService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateEnterpriseService {
  async execute({
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
    employee_count,
    esocial_renewal
  }) {
    if (!userId) {
      throw new Error("Usuário é obrigatório");
    }
    const userExists = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    const enterprise = await _prisma.default.enterprise.create({
      data: {
        user_id: userId,
        razao_social: razao_social || "",
        nome_fantasia: nome_fantasia || razao_social || "",
        document: document,
        ramo_atividade,
        cep,
        endereco,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        observation,
        type: type || "CNPJ",
        sgg_id,
        employee_count,
        esocial_renewal
      }
    });
    return enterprise;
  }
}
exports.CreateEnterpriseService = CreateEnterpriseService;