import prismaClient from "../../prisma";

interface TicketRequest {
  userId: string;
  page: number;
}

class ListAdminTicketsService {
  async execute({ userId, page }: TicketRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

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
