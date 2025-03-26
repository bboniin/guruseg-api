import prismaClient from '../../prisma'

interface ReminderRequest {
    id: string;
}

class DeleteReminderService {
    async execute({ id }: ReminderRequest) {

        const reminder = await prismaClient.leadReminders.findFirst({
            where: {
                id: id,
            }
        })

        if (!reminder) {
            throw new Error("Lembrete não encontrado")
        }

        await prismaClient.leadReminders.delete({
            where: {
                id: id,
            },
        })

        return "Deletado com sucesso"
    }
}

export { DeleteReminderService }