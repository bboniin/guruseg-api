import prismaClient from '../../prisma'
import { addYears, isAfter } from 'date-fns';

interface TimelineRequest {
    name: string;
    renewal_id: string;
    date_reminder: Date;
    observation: string;
}

class CreateTimelineService {
    async execute({ name, observation, date_reminder, renewal_id }: TimelineRequest) {

        if (!date_reminder || !name || !renewal_id ) {
            throw new Error("Preencha todos os campos")
        }
        
        if (isAfter(new Date(), date_reminder)) {
            throw new Error("Nova data de renovação está no passado")
        }

        const timeline = await prismaClient.companyTimeline.create({
            data: {
                name: name,
                date_reminder: new Date(date_reminder),
                renewal_id: renewal_id,
                observation: observation,
                check: false
            }
        })

        return (timeline)

    }
}

export { CreateTimelineService }