"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteStatementService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteStatementService {
  async execute({
    id
  }) {
    const statement = await _prisma.default.statement.findFirst({
      where: {
        id: id
      }
    });
    if (!statement) {
      throw new Error("Comunicado não encontrado");
    }
    await _prisma.default.statement.delete({
      where: {
        id: id
      }
    });
    return "Deletado com sucesso";
  }
}
exports.DeleteStatementService = DeleteStatementService;