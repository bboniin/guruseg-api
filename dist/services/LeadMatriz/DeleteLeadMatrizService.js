"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLeadMatrizService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteLeadMatrizService {
  async execute({
    id
  }) {
    if (!id) {
      throw new Error("ID do lead é obrigatório.");
    }
    const leadExists = await _prisma.default.leadMatriz.findUnique({
      where: {
        id
      }
    });
    if (!leadExists) {
      throw new Error("Lead da matriz não encontrado.");
    }
    const leadMatriz = await _prisma.default.leadMatriz.delete({
      where: {
        id
      }
    });
    return leadMatriz;
  }
}
exports.DeleteLeadMatrizService = DeleteLeadMatrizService;