"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListStatementsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListStatementsService {
  async execute({
    page
  }) {
    let filter = {};
    const listStatementsTotal = await _prisma.default.statement.count({
      where: filter
    });
    const listStatements = await _prisma.default.statement.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
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
    return {
      statements: listStatements,
      statementsTotal: listStatementsTotal
    };
  }
}
exports.ListStatementsService = ListStatementsService;