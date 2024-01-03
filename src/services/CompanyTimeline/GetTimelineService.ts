
import prismaClient from '../../prisma'

interface TimelineRequest {
    id: string;
}
class GetTimelineService {
    async execute({ id}: TimelineRequest) {

        if (!id) {
            throw new Error("Id é obrigatório")
        }

        const timeline = await prismaClient.companyTimeline.findUnique({
            where: {
                id: id
            },
            include: {
                renewal: true
            }
        })

        if (!timeline) {
            throw new Error("Lembrete não encontrada")
        }
        
        return (timeline)

    }
}

export { GetTimelineService }