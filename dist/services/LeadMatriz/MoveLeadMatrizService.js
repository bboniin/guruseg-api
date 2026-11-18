"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveLeadMatrizService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MoveLeadMatrizService {
  async execute({
    id,
    status
  }) {
    if (!id || !status) {
      throw new Error("ID do lead e novo status são obrigatórios.");
    }
    const leadExists = await _prisma.default.leadMatriz.findUnique({
      where: {
        id
      }
    });
    if (!leadExists) {
      throw new Error("Lead da matriz não encontrado.");
    }
    const leadMatriz = await _prisma.default.leadMatriz.update({
      where: {
        id
      },
      data: {
        status,
        update_at: new Date()
      }
    });
    return leadMatriz;
  }
}
exports.MoveLeadMatrizService = MoveLeadMatrizService;