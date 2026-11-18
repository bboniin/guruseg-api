"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListPaymentsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListPaymentsService {
  async execute({
    userId,
    page,
    order_id
  }) {
    const userBalance = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!userBalance) {
      throw new Error("Franqueado não encontrado");
    }
    const paymentsTotal = await _prisma.default.payment.findMany({
      where: {
        OR: [{
          orders: {
            some: order_id ? {
              id: order_id,
              user_id: userId
            } : {
              user_id: userId
            }
          }
        }, {
          user_id: userId
        }]
      }
    });
    const payments = await _prisma.default.payment.findMany({
      where: {
        OR: [{
          orders: {
            some: order_id ? {
              id: order_id,
              user_id: userId
            } : {
              user_id: userId
            }
          }
        }, {
          user_id: userId
        }]
      },
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
      totalValue,
      balance: userBalance.balance,
      balance_leads: userBalance.balance_leads
    };
  }
}
exports.ListPaymentsService = ListPaymentsService;