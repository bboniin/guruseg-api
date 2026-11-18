"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminOrdersPeriodoService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAdminOrdersPeriodoService {
  async execute({
    start_date,
    end_date
  }) {
    const orders = await _prisma.default.order.findMany({
      where: {
        AND: [{
          create_at: {
            gte: (0, _dateFns.startOfDay)(new Date(start_date))
          }
        }, {
          create_at: {
            lte: (0, _dateFns.endOfDay)(new Date(end_date))
          }
        }]
      },
      orderBy: {
        create_at: "desc"
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
    return orders;
  }
}
exports.ListAdminOrdersPeriodoService = ListAdminOrdersPeriodoService;