import prismaClient from '../../prisma'

interface ReminderRequest {
    name: string;
    description: string;
    date: Date;
    id: string;
}

class EditReminderService {
    async execute({ description, date, name, id }: ReminderRequest) {

        const reminderGet = await prismaClient.leadReminders.findUnique({
            where: {
                id: id,
            }
        })

        if (!reminderGet) {
            throw new Error("Lembrete não encontrado")
        }

        if (!name || !date) {
            throw new Error("Preencha nome e data do lembrete para salvar")
        }
        
        const reminder = await prismaClient.leadReminders.update({
            where: {
                id: id
            },
            data: {
                name: name,
                date: date,
                description: description
            }
        })

        return (reminder)

    }
}

export { EditReminderService }