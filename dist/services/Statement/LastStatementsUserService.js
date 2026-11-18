"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LastStatementsUserService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LastStatementsUserService {
  async execute({
    userId
  }) {
    const listStatements = await _prisma.default.statement.findMany({
      where: {
        create_at: {
          gte: (0, _dateFns.addDays)(new Date(), -30)
        }
      },
      orderBy: {
        create_at: "desc"
      }
    });
    return listStatements;
  }
}
exports.LastStatementsUserService = LastStatementsUserService;