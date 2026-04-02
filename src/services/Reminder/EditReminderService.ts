import prismaClient from "../../prisma";

interface ReminderRequest {
  name: string;
  description: string;
  date: Date;
  expiration_date: Date;
  id: string;
  userId: string;
}

class EditReminderService {
  async execute({
    description,
    date,
    expiration_date,
    userId,
    name,
    id,
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

    if (!name || !date || (reminderGet.type == "order" && !expiration_date)) {
      throw new Error("Preencha nome e data do lembrete para salvar");
    }

    const reminder = await prismaClient.reminder.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        date: date,
        expiration_date: expiration_date,
        description: description,
      },
    });

    return reminder;
  }
}

export { EditReminderService };
