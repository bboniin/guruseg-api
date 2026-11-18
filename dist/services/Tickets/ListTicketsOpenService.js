"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTicketsOpenService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListTicketsOpenService {
  async execute({
    userId
  }) {
    const tickets = await _prisma.default.ticket.findMany({
      where: {
        status: {
          not: "finalizado"
        },
        OR: [{
          user_id: userId
        }, {
          collaborator_id: userId
        }]
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
    const ticketsOrder = tickets.sort((a, b) => {
      const dateA = new Date(a.messages[0]?.created_at).getTime() || 0;
      const dateB = new Date(b.messages[0]?.created_at).getTime() || 0;
      return dateB - dateA;
    });
    return ticketsOrder;
  }
}
exports.ListTicketsOpenService = ListTicketsOpenService;