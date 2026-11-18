"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEnterpriseTecnicoService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateEnterpriseTecnicoService {
  async execute({
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
    employee_count,
    esocial_renewal
  }) {
    const isTecnic = await _prisma.default.collaborator.findUnique({
      where: {
        id: userId
      }
    });
    if (!isTecnic) {
      throw new Error("Rota restrita para técnicos");
    }
    if (!user_id) {
      throw new Error("O ID do usuário (Franqueado) é obrigatório");
    }
    const userExists = await _prisma.default.user.findUnique({
      where: {
        id: user_id
      }
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    const enterprise = await _prisma.default.enterprise.create({
      data: {
        user_id,
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
      },
      include: {
        user: true
      }
    });
    return enterprise;
  }
}
exports.CreateEnterpriseTecnicoService = CreateEnterpriseTecnicoService;