"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetStatementService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetStatementService {
  async execute({
    id
  }) {
    const statement = await _prisma.default.statement.findUnique({
      where: {
        id: id
      },
      include: {
        statement_confirms: {
          include: {
            user: true
          }
        }
      }
    });
    if (!statement) {
      throw new Error("Comunicado não encontrado");
    }
    return statement;
  }
}
exports.GetStatementService = GetStatementService;