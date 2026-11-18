"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListStatementsUserService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListStatementsUserService {
  async execute({
    userId
  }) {
    const listStatements = await _prisma.default.statement.findMany({
      where: {
        statement_confirms: {
          none: {
            user_id: userId
          }
        }
      },
      orderBy: {
        create_at: "desc"
      },
      include: {
        statement_confirms: {
          include: {
            user: true
          }
        }
      }
    });
    return listStatements;
  }
}
exports.ListStatementsUserService = ListStatementsUserService;