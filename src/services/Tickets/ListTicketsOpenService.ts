import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
}

class ListTicketsOpenService {
  async execute({ userId }: TicketRequest) {
    const tickets = await prismaClient.ticket.findMany({
      where: {
        status: {
          not: "finalizado",
        },
        OR: [
          {
            user_id: userId,
          },
          {
            collaborator_id: userId,
          },
        ],
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
    const ticketsOrder = tickets.sort((a, b) => {
      const dateA = new Date(a.messages[0]?.created_at).getTime() || 0;
      const dateB = new Date(b.messages[0]?.created_at).getTime() || 0;
      return dateB - dateA;
    });

    return ticketsOrder;
  }
}

export { ListTicketsOpenService };
