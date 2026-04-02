import prismaClient from "../../prisma";

interface ReminderRequest {
  name: string;
  description: string;
  date: Date;
  lead_id: string;
  userId: string;
  type: string;
  order_id: number;
  expiration_date: Date;
}
class CreateReminderService {
  async execute({
    name,
    description,
    date,
    type,
    order_id,
    expiration_date,
    lead_id,
    userId,
  }: ReminderRequest) {
    if (!name || !date) {
      throw new Error("Preencha nome e data do lembrete para salvar");
    }
    if (type == "lead") {
      const lead = await prismaClient.lead.findFirst({
        where: {
          id: lead_id,
          user_id: userId,
        },
      });

      if (!lead) {
        throw new Error("Lead não encontrado");
      }
    }
    if (type == "order") {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
          user_id: userId,
        },
      });

      if (!order) {
        throw new Error("OS não encontrada");
      }
    }

    const reminder = await prismaClient.reminder.create({
      data: {
        name: name,
        date: date,
        description: description,
        lead_id: lead_id || null,
        type: type,
        user_id: userId,
        order_id: order_id || null,
        expiration_date: expiration_date || date,
        confirm: false,
      },
    });

    return reminder;
  }
}

export { CreateReminderService };
