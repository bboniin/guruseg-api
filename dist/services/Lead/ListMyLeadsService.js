"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListMyLeadsService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListMyLeadsService {
  async execute({
    page,
    userId,
    status,
    all,
    dateStart,
    dateEnd
  }) {
    let filter = {};
    filter["user_id"] = userId;
    if (status) {
      filter["status"] = status;
    }
    if (all) {
      const leads = await _prisma.default.lead.findMany({
        where: filter,
        orderBy: {
          name: "desc"
        }
      });
      return leads;
    }
    if (dateStart) {
      filter["create_at"] = {
        gte: (0, _dateFns.startOfDay)(new Date(dateStart)),
        lte: (0, _dateFns.endOfDay)(new Date(dateEnd))
      };
    }
    const listLeadsTotal = await _prisma.default.lead.count({
      where: filter
    });
    const listLeads = await _prisma.default.lead.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc"
      },
      include: {
        reminders: true,
        contracts: {
          include: {
            services: true
          }
        },
        leadMaster: {
          include: {
            associate: true
          }
        }
      }
    });
    return {
      leads: listLeads,
      leadsTotal: listLeadsTotal
    };
  }
}
exports.ListMyLeadsService = ListMyLeadsService;