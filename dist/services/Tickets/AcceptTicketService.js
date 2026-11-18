"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptTicketService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AcceptTicketService {
  async execute({
    userId,
    ticket_id
  }) {
    const attendant = await _prisma.default.attendant.findUnique({
      where: {
        id: userId
      }
    });
    if (!attendant) {
      throw new Error("Rota restrita para atendentes");
    }
    const ticket = await _prisma.default.ticket.findFirst({
      where: {
        id: ticket_id,
        attendant_id: null,
        status: "pendente"
      }
    });
    if (!ticket) {
      throw new Error("Ticket não encontrado ou já foi iniciado o atendimento");
    }
    const ticketUpdate = await _prisma.default.ticket.update({
      where: {
        id: ticket_id
      },
      data: {
        attendant_id: userId,
        status: "andamento"
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
    return ticketUpdate;
  }
}
exports.AcceptTicketService = AcceptTicketService;