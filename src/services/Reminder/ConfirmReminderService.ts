import prismaClient from '../../prisma'

interface ReminderRequest {
    repeat: boolean;
    date_repeat: Date;
    id: string;
    description: string;
    name: string;
}

class ConfirmReminderService {
    async execute({ repeat, date_repeat, id, description, name }: ReminderRequest) {

        const reminderGet = await prismaClient.leadReminders.findUnique({
            where: {
                id: id,
            }
        })

        if (!reminderGet) {
            throw new Error("Lembrete não encontrado")
        }

        if(repeat){
            if (!name || !date_repeat) {
                throw new Error("Preencha nome e data do novo lembrete para concluir")
            }
        
            await prismaClient.leadReminders.create({
                data: {
                    name: name,
                    date: date_repeat,
                    description: description,
                    lead_id: reminderGet.lead_id,
                    confirm: false
                }
            })     
        }

        const reminder = await prismaClient.leadReminders.update({
            where: {
                id: id
            },
            data: {
                confirm: true
            }
        })

        return (reminder)

    }
}

export { ConfirmReminderService }