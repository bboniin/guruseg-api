import { generateHighlyUniqueCode } from "../../config/functions";
import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
  content: string;
  ticket_id: string;
  send_id: string;
  send_type: string;
}

class CreateTicketService {
  async execute({
    userId,
    content,
    ticket_id,
    send_id,
    send_type,
  }: TicketRequest) {
    const attendant = await prismaClient.attendant.findUnique({
      where: {
        id: userId,
      },
    });

    if (!attendant) {
      throw new Error("Rota restrita para atendentes");
    }
    let getTicket = null;
    if (ticket_id) {
      const ticket = await prismaClient.ticket.findFirst({
        where: {
          id: ticket_id,
          attendant_id: userId,
        },
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
        case "cliente": {
          const user = await prismaClient.user.findFirst({
            where: {
              id: send_id,
            },
          });

          if (!user) {
            throw new Error("Usuário não encontrado");
          }
          data = { user_id: send_id };
          break;
        }
        case "tecnico": {
          const collaborator = await prismaClient.collaborator.findFirst({
            where: {
              id: send_id,
            },
          });

          if (!collaborator) {
            throw new Error("Técnico não encontrado");
          }
          data = { collaborator_id: send_id };
          break;
        }
        default: {
          throw new Error("Tipo de usuário não é válido");
        }
      }
    } else {
      const order = await prismaClient.order.findUnique({
        where: {
          id: parseInt(getTicket.order_id),
        },
      });
      if (!order) {
        throw new Error("OS não encontrada");
      }
      if (getTicket.collaborator_id) {
        data = { user_id: order.user_id };
      } else {
        data = { collaborator_id: order.collaborator_id };
      }
    }

    if (getTicket) {
      data["order_id"] = getTicket.order_id;
    }

    const protocol_id = generateHighlyUniqueCode();

    if (data["order_id"]) {
      const ticket = await prismaClient.ticket.findFirst({
        where: {
          ...data,
          status: {
            not: "finalizado",
          },
        },
      });
      if (ticket) {
        throw new Error("Já existe um chamado em aberto para essa OS");
      }
    }

    const ticket = await prismaClient.ticket.create({
      data: {
        ...data,
        attendant_id: userId,
        status: "andamento",
        ticket_id: ticket_id || null,
        protocol_id: protocol_id,
      },
      include: {
        messages: {
          orderBy: { created_at: "desc" },
        },
        user: true,
        collaborator: true,
        attendant: true,
      },
    });

    if (ticket_id) {
      await prismaClient.ticket.update({
        where: {
          id: ticket_id,
        },
        data: {
          ticket_id: ticket.id,
        },
      });
    }

    if (content) {
      const message = await prismaClient.message.create({
        data: {
          content: content,
          send_id: userId,
          ticket_id: ticket.id,
        },
      });

      ticket.messages.push(message);
    }

    ticket["received_id"] = ticket.collaborator_id || ticket.user_id;

    return ticket;
  }
}

export { CreateTicketService };
