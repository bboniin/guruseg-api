"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmStatementService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfirmStatementService {
  async execute({
    userId,
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
    const confirmGet = await _prisma.default.statementConfirm.findFirst({
      where: {
        statement_id: id,
        user_id: userId
      }
    });
    if (confirmGet) {
      throw new Error("Comunicado já foi confirmado");
    }
    const statement = await _prisma.default.statementConfirm.create({
      data: {
        statement_id: id,
        user_id: userId,
        date: new Date()
      }
    });
    return statement;
  }
}
exports.ConfirmStatementService = ConfirmStatementService;