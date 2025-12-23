import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
  page: number;
}

class ListTicketsService {
  async execute({ userId, page }: TicketRequest) {
    const ticketsTotal = await prismaClient.ticket.count({
      where: {
        status: "finalizado",
        OR: [
          {
            user_id: userId,
          },
          {
            collaborator_id: userId,
          },
        ],
      },
    });

    const tickets = await prismaClient.ticket.findMany({
      where: {
        status: "finalizado",
        OR: [
          {
            user_id: userId,
          },
          {
            collaborator_id: userId,
          },
        ],
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        updated_at: "desc",
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

    return { tickets, ticketsTotal };
  }
}

export { ListTicketsService };
