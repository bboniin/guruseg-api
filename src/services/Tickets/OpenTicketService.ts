import { generateHighlyUniqueCode } from "../../config/functions";
import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
  content: string;
  order_id: string;
  send_type: string;
}

class OpenTicketService {
  async execute({ userId, content, send_type, order_id }: TicketRequest) {
    let data = {};
    switch (send_type) {
      case "cliente": {
        const user = await prismaClient.user.findFirst({
          where: {
            id: userId,
          },
        });
        if (!user) {
          throw new Error("Usuário não encontrado");
        }
        data = { user_id: userId };
        break;
      }
      case "tecnico": {
        const collaborator = await prismaClient.collaborator.findFirst({
          where: {
            id: userId,
          },
        });

        if (!collaborator) {
          throw new Error("Técnico não encontrado");
        }
        data = { collaborator_id: userId };
        break;
      }
      default: {
        throw new Error("Tipo de usuário não é válido");
      }
    }

    if (order_id) {
      const ticket = await prismaClient.ticket.findFirst({
        where: {
          order_id: order_id,
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

    const protocol_id = generateHighlyUniqueCode();

    const ticket = await prismaClient.ticket.create({
      data: {
        ...data,
        status: "pendente",
        order_id: order_id || "",
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

    return ticket;
  }
}

export { OpenTicketService };
