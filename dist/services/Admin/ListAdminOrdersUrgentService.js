"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminOrdersUrgentService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAdminOrdersUrgentService {
  async execute() {
    const ordersTotal = await _prisma.default.order.findMany({
      where: {
        urgent: true,
        status_payment: "confirmado",
        collaborator_id: null
      }
    });
    const orders = await _prisma.default.order.findMany({
      where: {
        urgent: true,
        status_payment: "confirmado",
        collaborator_id: null
      },
      orderBy: {
        update_at: "desc"
      },
      include: {
        items: {
          orderBy: {
            create_at: "asc"
          }
        },
        user: true,
        collaborator: true,
        enterprise: true
      }
    });
    return {
      orders: orders,
      ordersTotal: ordersTotal.length
    };
  }
}
exports.ListAdminOrdersUrgentService = ListAdminOrdersUrgentService;