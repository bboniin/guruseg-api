"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminTicketsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAdminTicketsService {
  async execute({
    page
  }) {
    const ticketsTotal = await _prisma.default.ticket.count({});
    const tickets = await _prisma.default.ticket.findMany({
      skip: page * 30,
      take: 30,
      orderBy: {
        created_at: "desc"
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
exports.ListAdminTicketsService = ListAdminTicketsService;