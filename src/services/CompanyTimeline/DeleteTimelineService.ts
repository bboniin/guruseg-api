import prismaClient from '../../prisma'

interface TimelineRequest {
    id: string;
}

class DeleteTimelineService {
    async execute({ id }: TimelineRequest) {

        if (!id) {
            throw new Error("ID é obrigátorio")
        }

        const timelineGet = await prismaClient.companyTimeline.findFirst({
            where: {
                id: id,
            },
        })

        if (!timelineGet) {
            throw new Error("Lembrete não encontrada")
        }

        const timeline = await prismaClient.companyTimeline.delete({
            where: {
                id: id,
            },
        })

        return (timeline)
    }
}

export { DeleteTimelineService }