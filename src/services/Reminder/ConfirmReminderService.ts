import prismaClient from "../../prisma";

interface ReminderRequest {
  repeat: boolean;
  date_repeat: Date;
  date_expiration: Date;
  id: string;
  description: string;
  name: string;
  userId: string;
}

class ConfirmReminderService {
  async execute({
    repeat,
    date_repeat,
    date_expiration,
    id,
    description,
    name,
    userId,
  }: ReminderRequest) {
    const reminderGet = await prismaClient.reminder.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });

    if (!reminderGet) {
      throw new Error("Lembrete não encontrado");
    }

    if (repeat) {
      if (
        !name ||
        !date_repeat ||
        (reminderGet.type == "order" && !date_expiration)
      ) {
        throw new Error("Preencha nome e data do novo lembrete para concluir");
      }

      await prismaClient.reminder.create({
        data: {
          name: name,
          date: date_repeat,
          description: description,
          lead_id: reminderGet.lead_id,
          type: reminderGet.type,
          order_id: reminderGet.order_id,
          user_id: reminderGet.user_id,
          expiration_date: date_repeat,
          confirm: false,
        },
      });
    }

    const reminder = await prismaClient.reminder.update({
      where: {
        id: id,
      },
      data: {
        confirm: true,
      },
    });

    return reminder;
  }
}

export { ConfirmReminderService };
