"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankingUsersMatrizService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RankingUsersMatrizService {
  async execute({
    userId,
    date_start,
    date_end
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });
    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }
    let filterSearch = {};
    if (!date_start || !date_end) {
      throw new Error("Data de inicio e fim do periodo é obrigátorio");
    }
    filterSearch["create_at"] = {
      gte: (0, _dateFns.startOfDay)(new Date(date_start)),
      lte: (0, _dateFns.endOfDay)(new Date(date_end))
    };
    const users = await _prisma.default.user.findMany({
      where: {
        visible: true,
        type: "matriz"
      },
      include: {
        orders: {
          where: filterSearch,
          include: {
            items: true
          }
        }
      }
    });
    let totalPayments = 0;
    users.map(data => {
      data["totalPayment"] = 0;
      data["totalServices"] = 0;
      data["totalUrgency"] = 0;
      data["servicesPeriod"] = {};
      data.orders.map(item => {
        if (item.urgent) {
          data["totalUrgency"]++;
        }
        item.items.map(item => {
          data["totalServices"] += item.amount;
          data["totalPayment"] += item.amount + item.value;
          if (!data["servicesPeriod"][item.id]) {
            data["servicesPeriod"][item.id] = {
              name: item.name,
              value: item.value,
              amount: item.amount
            };
          } else {
            data["servicesPeriod"][item.id]["amount"] += item.amount;
          }
        });
      });
      data["servicesPeriod"] = Object.values(data["servicesPeriod"]);
      data["servicesPeriod"] = data["servicesPeriod"].sort((a, b) => {
        return b["amount"] - a["amount"];
      });
      totalPayments += data["totalPayment"];
    });
    const orderUsers = users.sort((a, b) => {
      return b["totalPayment"] - a["totalPayment"];
    });
    const s3Storage = new _S3Storage.default();
    const usersResponse = await Promise.all(orderUsers.map(async user => {
      if (user.photo) {
        user["photo_url"] = await s3Storage.getTemporaryUrl(user.photo, 245);
      }
      return user;
    }));
    return {
      users: usersResponse,
      totalPayments
    };
  }
}
exports.RankingUsersMatrizService = RankingUsersMatrizService;