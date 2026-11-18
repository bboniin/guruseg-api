"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListDepositsAdminService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListDepositsAdminService {
  async execute({
    page,
    collaborator_id,
    status,
    endDate,
    startDate
  }) {
    let filter = {};
    if (collaborator_id) {
      filter["user_id"] = collaborator_id;
    }
    if (status) {
      filter["status"] = status;
    }
    if (endDate && startDate) {
      filter["AND"] = [{
        update_at: {
          gte: (0, _dateFns.startOfDay)(new Date(startDate))
        }
      }, {
        update_at: {
          lte: (0, _dateFns.endOfDay)(new Date(endDate))
        }
      }];
    }
    const depositsTotal = await _prisma.default.deposit.count({
      where: filter
    });
    const deposits = await _prisma.default.deposit.findMany({
      where: filter,
      orderBy: {
        create_at: "asc"
      },
      skip: page * 30,
      take: 30,
      include: {
        user: true
      }
    });
    return {
      deposits,
      depositsTotal
    };
  }
}
exports.ListDepositsAdminService = ListDepositsAdminService;