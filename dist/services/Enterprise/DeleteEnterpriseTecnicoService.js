"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteEnterpriseTecnicoService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteEnterpriseTecnicoService {
  async execute({
    id,
    userId
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
    const enterpriseExists = await _prisma.default.enterprise.findFirst({
      where: {
        id,
        visible: true
      }
    });
    if (!enterpriseExists) {
      throw new Error("Empresa não encontrada");
    }
    const enterprise = await _prisma.default.enterprise.update({
      where: {
        id
      },
      data: {
        visible: false
      }
    });
    return enterprise;
  }
}
exports.DeleteEnterpriseTecnicoService = DeleteEnterpriseTecnicoService;