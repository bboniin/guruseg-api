import { isAfter } from 'date-fns';
import prismaClient from '../../prisma'

interface TimelineRequest {
    name: string;
    date_reminder: Date;
    id: string;
    renewal_id: string;
    observation: string;
}

class EditTimelineService {
    async execute({ id, observation, renewal_id, name, date_reminder }: TimelineRequest) {

        if (!id || !name || !date_reminder || !renewal_id) {
            throw new Error("Preencha todos os campos")
        }

        if (isAfter(new Date(), date_reminder)) {
            throw new Error("Data de lembrete está no passado")
        }

        const timeline = await prismaClient.companyTimeline.update({
            where: {
                id: id
            },
            data: {
                name: name,
                renewal_id: renewal_id,
                observation: observation,
                date_reminder: new Date(date_reminder)
            }
        })

        return (timeline)

    }
}

export { EditTimelineService }