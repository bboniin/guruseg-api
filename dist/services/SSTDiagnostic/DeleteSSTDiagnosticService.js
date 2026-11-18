"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteSSTDiagnosticService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteSSTDiagnosticService {
  async execute({
    id,
    userId
  }) {
    if (!id) {
      throw new Error("ID do diagnóstico é obrigatório");
    }
    const item = await _prisma.default.sSTDiagnostic.findFirst({
      where: {
        id,
        user_id: userId
      }
    });
    if (!item) {
      throw new Error("Diagnóstico não encontrado ou não pertence a este usuário");
    }
    await _prisma.default.sSTDiagnostic.delete({
      where: {
        id
      }
    });
    return {
      message: "Diagnóstico excluído com sucesso"
    };
  }
}
exports.DeleteSSTDiagnosticService = DeleteSSTDiagnosticService;