"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRemindersService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListRemindersService {
  async execute({
    page,
    userId,
    status,
    lead_id,
    dateStart,
    dateEnd,
    type,
    order_id
  }) {
    let filter = {
      user_id: userId
    };
    if (type) {
      filter["type"] = type;
    }
    if (order_id) {
      filter["order_id"] = order_id;
    }
    if (lead_id) {
      filter["lead_id"] = lead_id;
    }
    if (status) {
      switch (status) {
        case "vencido":
          {
            filter["confirm"] = false;
            filter["date"] = {
              lte: (0, _dateFns.startOfDay)(new Date())
            };
            break;
          }
        case "avencer":
          {
            filter["confirm"] = false;
            filter["date"] = {
              gte: (0, _dateFns.startOfDay)(new Date()),
              lte: (0, _dateFns.endOfDay)((0, _dateFns.addDays)(new Date(), 15))
            };
            break;
          }
        case "pendente":
          {
            filter["confirm"] = false;
            filter["date"] = {
              gte: (0, _dateFns.startOfDay)(new Date())
            };
            if (dateStart) {
              filter["date"] = {
                gte: (0, _dateFns.startOfDay)(new Date(dateStart)),
                lte: (0, _dateFns.endOfDay)(new Date(dateEnd))
              };
            }
            break;
          }
        case "concluido":
          {
            filter["confirm"] = true;
            if (dateStart) {
              filter["date"] = {
                gte: (0, _dateFns.startOfDay)(new Date(dateStart)),
                lte: (0, _dateFns.endOfDay)(new Date(dateEnd))
              };
            }
            break;
          }
      }
    } else {
      if (dateStart) {
        filter["date"] = {
          gte: (0, _dateFns.startOfDay)(new Date(dateStart)),
          lte: (0, _dateFns.endOfDay)(new Date(dateEnd))
        };
      }
    }
    const listRemindersTotal = await _prisma.default.reminder.count({
      where: filter
    });
    const listReminders = await _prisma.default.reminder.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        date: "asc"
      },
      include: {
        lead: {
          include: {
            contracts: true,
            reminders: true
          }
        }
      }
    });
    return {
      reminders: listReminders,
      remindersTotal: listRemindersTotal
    };
  }
}
exports.ListRemindersService = ListRemindersService;