"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTicketsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListTicketsService {
  async execute({
    userId,
    page
  }) {
    const ticketsTotal = await _prisma.default.ticket.count({
      where: {
        status: "finalizado",
        OR: [{
          user_id: userId
        }, {
          collaborator_id: userId
        }]
      }
    });
    const tickets = await _prisma.default.ticket.findMany({
      where: {
        status: "finalizado",
        OR: [{
          user_id: userId
        }, {
          collaborator_id: userId
        }]
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        updated_at: "desc"
      },
      include: {
        messages: {
          orderBy: {
            created_at: "desc"
          }
        },
        user: true,
        collaborator: true,
        attendant: true
      }
    });
    return {
      tickets,
      ticketsTotal
    };
  }
}
exports.ListTicketsService = ListTicketsService;