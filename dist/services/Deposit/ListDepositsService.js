"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListDepositsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListDepositsService {
  async execute({
    userId,
    page
  }) {
    const depositsTotal = await _prisma.default.deposit.count({
      where: {
        user_id: userId
      }
    });
    const deposits = await _prisma.default.deposit.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        create_at: "desc"
      },
      skip: page * 30,
      take: 30
    });
    return {
      deposits,
      depositsTotal
    };
  }
}
exports.ListDepositsService = ListDepositsService;