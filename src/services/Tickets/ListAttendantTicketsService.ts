import prismaClient from "../../prisma";

interface TicketRequest {
  page: number;
  userId: string;
}

class ListAttendantTicketsService {
  async execute({ page, userId }: TicketRequest) {
    const attendant = await prismaClient.attendant.findUnique({
      where: {
        id: userId,
      },
    });

    if (!attendant) {
      throw new Error("Rota restrita para atendentes");
    }

    const ticketsTotal = await prismaClient.ticket.count({
      where: {
        attendant_id: userId,
        status: "finalizado",
      },
    });

    const tickets = await prismaClient.ticket.findMany({
      where: {
        attendant_id: userId,
        status: "finalizado",
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        updated_at: "asc",
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

    const ticketsPedding = await prismaClient.ticket.findMany({
      where: {
        attendant_id: null,
      },
      orderBy: {
        created_at: "asc",
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

    const ticketsAttendant = await prismaClient.ticket.findMany({
      where: {
        attendant_id: userId,
        status: "andamento",
      },
      orderBy: { created_at: "asc" },
      include: {
        messages: {
          orderBy: { created_at: "desc" },
        },
        user: true,
        collaborator: true,
        attendant: true,
      },
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
      ticketsTotal,
    };
  }
}

export { ListAttendantTicketsService };
