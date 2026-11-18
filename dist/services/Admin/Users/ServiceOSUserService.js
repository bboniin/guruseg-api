"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceOSUserService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ServiceOSUserService {
  async execute({
    id,
    start_date,
    service,
    end_date
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        courses_enabled: true,
        leads_enabled: true,
        marketing_enabled: true,
        credentials_enabled: true,
        category: true
      }
    });
    if (!user) {
      throw new Error("Franqueado não foi encontrado.");
    }
    const orders = await _prisma.default.order.findMany({
      where: {
        user_id: id,
        status: "finalizado",
        AND: [{
          update_at: {
            gte: (0, _dateFns.startOfDay)(new Date(start_date))
          }
        }, {
          update_at: {
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
        }
      }
    });
    let servicoOS = 0;
    orders.map(item => {
      item.items.map(data => {
        if (data.name == service) {
          servicoOS += data.amount;
        }
      });
    });
    return servicoOS;
  }
}
exports.ServiceOSUserService = ServiceOSUserService;