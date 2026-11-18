"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendMessageTicketService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SendMessageTicketService {
  async execute({
    userId,
    content,
    ticket_id,
    send_type
  }) {
    if (!send_type || !userId || !content || !ticket_id) {
      throw new Error("Todos os campos são obrigátorios");
    }
    let data = null;
    switch (send_type) {
      case "atendente":
        {
          data = {
            attendant_id: userId
          };
          break;
        }
      case "cliente":
        {
          data = {
            user_id: userId
          };
          break;
        }
      case "tecnico":
        {
          data = {
            collaborator_id: userId
          };
          break;
        }
    }
    const ticket = await _prisma.default.ticket.findFirst({
      where: {
        ...data,
        id: ticket_id
      }
    });
    if (!ticket || !data) {
      throw new Error("Ticket não encontrado");
    }
    const message = await _prisma.default.message.create({
      data: {
        content: content,
        send_id: userId,
        ticket_id: ticket_id
      }
    });
    if (ticket.attendant_id == userId) {
      message["received_id"] = ticket.collaborator_id || ticket.user_id;
    } else {
      message["received_id"] = ticket.attendant_id;
    }
    return message;
  }
}
exports.SendMessageTicketService = SendMessageTicketService;