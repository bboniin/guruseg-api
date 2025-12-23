import prismaClient from "../../prisma";

interface MessageRequest {
  userId: string;
  content: string;
  ticket_id: string;
  send_type: string;
}

class SendMessageTicketService {
  async execute({ userId, content, ticket_id, send_type }: MessageRequest) {
    if (!send_type || !userId || !content || !ticket_id) {
      throw new Error("Todos os campos são obrigátorios");
    }

    let data = null;

    switch (send_type) {
      case "atendente": {
        data = { attendant_id: userId };
        break;
      }
      case "cliente": {
        data = { user_id: userId };
        break;
      }
      case "tecnico": {
        data = { collaborator_id: userId };
        break;
      }
    }

    const ticket = await prismaClient.ticket.findFirst({
      where: {
        ...data,
        id: ticket_id,
      },
    });

    if (!ticket || !data) {
      throw new Error("Ticket não encontrado");
    }

    const message = await prismaClient.message.create({
      data: {
        content: content,
        send_id: userId,
        ticket_id: ticket_id,
      },
    });

    if (ticket.attendant_id == userId) {
      message["received_id"] = ticket.collaborator_id || ticket.user_id;
    } else {
      message["received_id"] = ticket.attendant_id;
    }

    return message;
  }
}

export { SendMessageTicketService };
