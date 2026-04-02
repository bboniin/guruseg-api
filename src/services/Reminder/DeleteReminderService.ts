import prismaClient from "../../prisma";

interface ReminderRequest {
  id: string;
  userId: string;
}

class DeleteReminderService {
  async execute({ id, userId }: ReminderRequest) {
    const reminder = await prismaClient.reminder.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });

    if (!reminder) {
      throw new Error("Lembrete não encontrado");
    }

    await prismaClient.reminder.delete({
      where: {
        id: id,
      },
    });

    return "Deletado com sucesso";
  }
}

export { DeleteReminderService };
