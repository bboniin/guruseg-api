"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPaymentUserService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetPaymentUserService {
  async execute() {
    const payments = await _prisma.default.payment.findMany({
      where: {
        user_id: null
      },
      include: {
        orders: true
      }
    });
    await _prisma.default.leadMaster.updateMany({
      where: {
        price: 19.9
      },
      data: {
        price: 1.97
      }
    });
    return payments;
  }
}
exports.GetPaymentUserService = GetPaymentUserService;