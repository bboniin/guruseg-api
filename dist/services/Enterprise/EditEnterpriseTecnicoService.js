"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditEnterpriseTecnicoService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditEnterpriseTecnicoService {
  async execute({
    userId,
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
    if (!id) {
      throw new Error("ID da empresa é obrigatório");
    }
    const enterpriseExists = await _prisma.default.enterprise.findUnique({
      where: {
        id
      }
    });
    if (!enterpriseExists) {
      throw new Error("Empresa não encontrada");
    }
    if (user_id) {
      const userExists = await _prisma.default.user.findUnique({
        where: {
          id: user_id
        }
      });
      if (!userExists) {
        throw new Error("Usuário (Franqueado) informado não encontrado");
      }
    }
    const enterprise = await _prisma.default.enterprise.update({
      where: {
        id
      },
      data: {
        ...(user_id && {
          user_id
        }),
        razao_social,
        nome_fantasia,
        ramo_atividade,
        cep,
        endereco,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        observation,
        ...(sgg_id !== undefined && {
          sgg_id
        }),
        ...(employee_count !== undefined && {
          employee_count
        }),
        ...(esocial_renewal !== undefined && {
          esocial_renewal
        }),
        update_at: new Date()
      },
      include: {
        user: true
      }
    });
    return enterprise;
  }
}
exports.EditEnterpriseTecnicoService = EditEnterpriseTecnicoService;