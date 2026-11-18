"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenTicketService = void 0;
var _functions = require("../../config/functions");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class OpenTicketService {
  async execute({
    userId,
    content,
    send_type,
    order_id
  }) {
    let data = {};
    switch (send_type) {
      case "cliente":
        {
          const user = await _prisma.default.user.findFirst({
            where: {
              id: userId
            }
          });
          if (!user) {
            throw new Error("Usuário não encontrado");
          }
          data = {
            user_id: userId
          };
          break;
        }
      case "tecnico":
        {
          const collaborator = await _prisma.default.collaborator.findFirst({
            where: {
              id: userId
            }
          });
          if (!collaborator) {
            throw new Error("Técnico não encontrado");
          }
          data = {
            collaborator_id: userId
          };
          break;
        }
      default:
        {
          throw new Error("Tipo de usuário não é válido");
        }
    }
    if (order_id) {
      const ticket = await _prisma.default.ticket.findFirst({
        where: {
          order_id: order_id,
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
    const protocol_id = (0, _functions.generateHighlyUniqueCode)();
    const ticket = await _prisma.default.ticket.create({
      data: {
        ...data,
        status: "pendente",
        order_id: order_id || "",
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
    return ticket;
  }
}
exports.OpenTicketService = OpenTicketService;