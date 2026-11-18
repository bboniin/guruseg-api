"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditStatementService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditStatementService {
  async execute({
    description,
    title,
    id
  }) {
    const statementGet = await _prisma.default.statement.findUnique({
      where: {
        id: id
      }
    });
    if (!statementGet) {
      throw new Error("Comunicado não encontrado");
    }
    if (!title || !description) {
      throw new Error("Preencha titulo e descrição para salvar");
    }
    const statement = await _prisma.default.statement.update({
      where: {
        id: id
      },
      data: {
        title: title,
        description: description
      }
    });
    return statement;
  }
}
exports.EditStatementService = EditStatementService;