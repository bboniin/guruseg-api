import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
  ticket_id: string;
}

class GetTicketService {
  async execute({ userId, ticket_id }: TicketRequest) {
    const ticket = await prismaClient.ticket.findFirst({
      where: {
        id: ticket_id,
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

    if (!ticket) {
      throw new Error("Chamado não foi encontrado");
    }

    if (
      ticket.user_id != userId &&
      ticket.collaborator_id != userId &&
      ticket.attendant_id != userId
    ) {
      const admin = await prismaClient.admin.findUnique({
        where: {
          id: userId,
        },
      });

      if (!admin) {
        throw new Error("Chamado não foi encontrado");
      }
    }

    if (
      ticket.user_id != userId ||
      ticket.collaborator_id != userId ||
      ticket.attendant_id != userId
    ) {
      await prismaClient.message.updateMany({
        where: {
          ticket_id: ticket_id,
          send_id: {
            not: userId,
          },
        },
        data: {
          is_viewed: true,
          viewed_at: new Date(),
        },
      });
    }

    return ticket;
  }
}

export { GetTicketService };
