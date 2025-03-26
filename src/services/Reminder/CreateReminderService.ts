import prismaClient from '../../prisma';

interface ReminderRequest {
    name: string;
    description: string;
    date: Date;
    lead_id: string;
    userId: string;
}
class CreateReminderService {
    async execute({ name, description, date, lead_id, userId }: ReminderRequest) {

        const lead = await prismaClient.lead.findFirst({
            where: {
                id: lead_id,
                user_id: userId
            }
        })

        if (!lead) {
            throw new Error("Lead não encontrado")
        }

        if (!name || !date) {
            throw new Error("Preencha nome e data do lembrete para salvar")
        }

        const reminder = await prismaClient.leadReminders.create({
            data: {
                name: name,
                date: date,
                description: description,
                lead_id: lead_id,
                confirm: false
            }
        })

        return (reminder)

    }
}

export { CreateReminderService }