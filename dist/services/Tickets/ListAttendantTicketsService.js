"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAttendantTicketsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAttendantTicketsService {
  async execute({
    page,
    userId
  }) {
    const attendant = await _prisma.default.attendant.findUnique({
      where: {
        id: userId
      }
    });
    if (!attendant) {
      throw new Error("Rota restrita para atendentes");
    }
    const ticketsTotal = await _prisma.default.ticket.count({
      where: {
        attendant_id: userId,
        status: "finalizado"
      }
    });
    const tickets = await _prisma.default.ticket.findMany({
      where: {
        attendant_id: userId,
        status: "finalizado"
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        updated_at: "asc"
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
    const ticketsPedding = await _prisma.default.ticket.findMany({
      where: {
        attendant_id: null
      },
      orderBy: {
        created_at: "asc"
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
    const ticketsAttendant = await _prisma.default.ticket.findMany({
      where: {
        attendant_id: userId,
        status: "andamento"
      },
      orderBy: {
        created_at: "asc"
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
    const ticketsAttendantOrder = ticketsAttendant.sort((a, b) => {
      const dateA = new Date(a.messages[0]?.created_at).getTime() || 0;
      const dateB = new Date(b.messages[0]?.created_at).getTime() || 0;
      return dateB - dateA;
    });
    return {
      ticketsAttendant: ticketsAttendantOrder,
      ticketsPedding: ticketsPedding,
      tickets: tickets,
      ticketsTotal
    };
  }
}
exports.ListAttendantTicketsService = ListAttendantTicketsService;