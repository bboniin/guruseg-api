"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancelOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CancelOrderService {
  async execute({
    id
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      }
    });
    if (order.collaborator_id) {
      throw new Error("Ordem de serviço já está em andamento, não sendo possivel mais a exclusão.");
    }
    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        status: "cancelado"
      },
      include: {
        items: true,
        messages: true
      }
    });
    orderD["totalServices"] = order.urgent ? 1 : 0;
    orderD["totalValue"] = order.urgent ? 147 : 0;
    orderD.items.map(item => {
      orderD["totalServices"] += item.amount;
      orderD["totalValue"] += item.value * item.amount;
    });
    if (order.payment_id) {
      const user = await _prisma.default.user.findUnique({
        where: {
          id: orderD.user_id
        }
      });
      const payment = await _prisma.default.payment.update({
        where: {
          id: order.payment_id
        },
        data: {
          status: "cancelado"
        }
      });
      await _prisma.default.user.update({
        where: {
          id: user.id
        },
        data: {
          balance: parseFloat((user.balance + payment.value).toFixed(2))
        }
      });
    }
    return orderD;
  }
}
exports.CancelOrderService = CancelOrderService;