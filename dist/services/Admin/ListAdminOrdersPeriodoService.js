"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminOrdersPeriodoService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListAdminOrdersPeriodoService {
  async execute({
    start_date,
    end_date
  }) {
    const orders = await _prisma.default.order.findMany({
      where: {
        AND: [{
          create_at: {
            gte: start_date
          }
        }, {
          create_at: {
            lte: end_date
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
        }
      }
    });
    return orders;
  }

}

exports.ListAdminOrdersPeriodoService = ListAdminOrdersPeriodoService;