"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsSendService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListLeadsSendService {
  async execute({
    page,
    all,
    tag,
    dateStart,
    dateEnd
  }) {
    let filter = {
      leads: {
        none: {}
      }
    };
    if (all) {
      const leads = await _prisma.default.leadMaster.findMany({
        where: {
          leads: {
            none: {}
          }
        },
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
    if (tag) {
      filter["tag"] = tag;
    }
    const listLeadsTotal = await _prisma.default.leadMaster.count({
      where: filter
    });
    const listLeads = await _prisma.default.leadMaster.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc"
      },
      include: {
        associate: true,
        leads: {
          include: {
            user: true
          },
          orderBy: {
            create_at: "desc"
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
exports.ListLeadsSendService = ListLeadsSendService;