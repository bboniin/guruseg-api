"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateStatementService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateStatementService {
  async execute({
    title,
    description
  }) {
    if (!title || !description) {
      throw new Error("Preencha titulo e descrição para salvar");
    }
    const statement = await _prisma.default.statement.create({
      data: {
        title: title,
        description: description
      }
    });
    return statement;
  }
}
exports.CreateStatementService = CreateStatementService;