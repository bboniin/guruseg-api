"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminPaymentsService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAdminPaymentsService {
  async execute({
    page,
    startDate,
    endDate,
    method,
    user_id,
    status,
    type
  }) {
    let filter = {};
    if (status) {
      filter["status"] = status;
    }
    if (method) {
      filter["method"] = method;
    }
    if (user_id) {
      filter["user_id"] = user_id;
    }
    if (type) {
      filter["type"] = type;
    }
    if (startDate) {
      filter["create_at"] = {
        gte: (0, _dateFns.startOfDay)(new Date(startDate)),
        lte: (0, _dateFns.endOfDay)(new Date(endDate))
      };
    }
    const paymentsTotal = await _prisma.default.payment.findMany({
      where: filter
    });
    const payments = await _prisma.default.payment.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc"
      }
    });
    const totalValue = paymentsTotal.reduce((sum, transaction) => sum + transaction.value, 0);
    return {
      payments,
      paymentsTotal: paymentsTotal.length,
      totalValue
    };
  }
}
exports.ListAdminPaymentsService = ListAdminPaymentsService;