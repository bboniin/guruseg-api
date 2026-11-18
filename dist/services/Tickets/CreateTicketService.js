"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTicketService = void 0;
var _functions = require("../../config/functions");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateTicketService {
  async execute({
    userId,
    content,
    ticket_id,
    send_id,
    send_type
  }) {
    const attendant = await _prisma.default.attendant.findUnique({
      where: {
        id: userId
      }
    });
    if (!attendant) {
      throw new Error("Rota restrita para atendentes");
    }
    let getTicket = null;
    if (ticket_id) {
      const ticket = await _prisma.default.ticket.findFirst({
        where: {
          id: ticket_id,
          attendant_id: userId
        }
      });
      if (!ticket) {
        throw new Error("Ticket não encontrado");
      } else {
        getTicket = ticket;
      }
    }
    let data = {};
    if (!ticket_id) {
      switch (send_type) {
        case "cliente":
          {
            const user = await _prisma.default.user.findFirst({
              where: {
                id: send_id
              }
            });
            if (!user) {
              throw new Error("Usuário não encontrado");
            }
            data = {
              user_id: send_id
            };
            break;
          }
        case "tecnico":
          {
            const collaborator = await _prisma.default.collaborator.findFirst({
              where: {
                id: send_id
              }
            });
            if (!collaborator) {
              throw new Error("Técnico não encontrado");
            }
            data = {
              collaborator_id: send_id
            };
            break;
          }
        default:
          {
            throw new Error("Tipo de usuário não é válido");
          }
      }
    } else {
      const order = await _prisma.default.order.findUnique({
        where: {
          id: parseInt(getTicket.order_id)
        }
      });
      if (!order) {
        throw new Error("OS não encontrada");
      }
      if (getTicket.collaborator_id) {
        data = {
          user_id: order.user_id
        };
      } else {
        data = {
          collaborator_id: order.collaborator_id
        };
      }
    }
    if (getTicket) {
      data["order_id"] = getTicket.order_id;
    }
    const protocol_id = (0, _functions.generateHighlyUniqueCode)();
    if (data["order_id"]) {
      const ticket = await _prisma.default.ticket.findFirst({
        where: {
          ...data,
          status: {
            not: "finalizado"
          }
        }
      });
      if (ticket) {
        throw new Error("Já existe um chamado em aberto para essa OS");
      }
    }
    const ticket = await _prisma.default.ticket.create({
      data: {
        ...data,
        attendant_id: userId,
        status: "andamento",
        ticket_id: ticket_id || null,
        protocol_id: protocol_id
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
    if (ticket_id) {
      await _prisma.default.ticket.update({
        where: {
          id: ticket_id
        },
        data: {
          ticket_id: ticket.id
        }
      });
    }
    if (content) {
      const message = await _prisma.default.message.create({
        data: {
          content: content,
          send_id: userId,
          ticket_id: ticket.id
        }
      });
      ticket.messages.push(message);
    }
    ticket["received_id"] = ticket.collaborator_id || ticket.user_id;
    return ticket;
  }
}
exports.CreateTicketService = CreateTicketService;