"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTicketService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetTicketService {
  async execute({
    userId,
    ticket_id
  }) {
    const ticket = await _prisma.default.ticket.findFirst({
      where: {
        id: ticket_id
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
    if (!ticket) {
      throw new Error("Chamado não foi encontrado");
    }
    if (ticket.user_id != userId && ticket.collaborator_id != userId && ticket.attendant_id != userId) {
      const admin = await _prisma.default.admin.findUnique({
        where: {
          id: userId
        }
      });
      if (!admin) {
        throw new Error("Chamado não foi encontrado");
      }
    }
    if (ticket.user_id != userId || ticket.collaborator_id != userId || ticket.attendant_id != userId) {
      await _prisma.default.message.updateMany({
        where: {
          ticket_id: ticket_id,
          send_id: {
            not: userId
          }
        },
        data: {
          is_viewed: true,
          viewed_at: new Date()
        }
      });
    }
    return ticket;
  }
}
exports.GetTicketService = GetTicketService;