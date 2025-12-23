import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
  ticket_id: string;
}

class ClosedTicketService {
  async execute({ userId, ticket_id }: TicketRequest) {
    const attendant = await prismaClient.attendant.findUnique({
      where: {
        id: userId,
      },
    });

    if (!attendant) {
      throw new Error("Rota restrita para atendentes");
    }

    const ticket = await prismaClient.ticket.findFirst({
      where: {
        id: ticket_id,
        attendant_id: userId,
        status: "andamento",
      },
    });

    if (!ticket) {
      throw new Error("Ticket não encontrado ou já foi finalizado");
    }

    const ticketUpdate = await prismaClient.ticket.update({
      where: {
        id: ticket_id,
      },
      data: {
        status: "finalizado",
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

    return ticketUpdate;
  }
}

export { ClosedTicketService };
