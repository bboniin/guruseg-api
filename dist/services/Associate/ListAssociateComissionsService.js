"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociateComissionsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAssociateComissionsService {
  async execute({
    userId,
    page
  }) {
    const paymentsTotalArray = await _prisma.default.associatePayment.findMany({
      where: {
        associate_id: userId
      }
    });
    const payments = await _prisma.default.associatePayment.findMany({
      where: {
        associate_id: userId
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc"
      }
    });
    const paymentsTotalValue = paymentsTotalArray.reduce((acc, payment) => {
      return acc + payment.value;
    }, 0);
    const paymentsTotal = paymentsTotalArray.length;
    return {
      payments,
      paymentsTotal,
      paymentsTotalValue
    };
  }
}
exports.ListAssociateComissionsService = ListAssociateComissionsService;