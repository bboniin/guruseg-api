"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminAssociatePaymentsComissionService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAdminAssociatePaymentsComissionService {
  async execute({
    page,
    associate_id
  }) {
    const paymentsTotalArray = await _prisma.default.associatePayment.findMany({
      where: {
        associate_id: associate_id
      }
    });
    const payments = await _prisma.default.associatePayment.findMany({
      where: {
        associate_id: associate_id
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
exports.ListAdminAssociatePaymentsComissionService = ListAdminAssociatePaymentsComissionService;