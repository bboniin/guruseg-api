import prismaClient from "../../prisma";

interface TicketRequest {
  page: number;
}

class ListAdminTicketsService {
  async execute({ page }: TicketRequest) {
    const ticketsTotal = await prismaClient.ticket.count({});

    const tickets = await prismaClient.ticket.findMany({
      skip: page * 30,
      take: 30,
      orderBy: {
        created_at: "desc",
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

export { ListAdminTicketsService };
