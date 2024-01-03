
import prismaClient from '../../prisma'

interface RenewalRequest {
    id: string;
}
class CheckTimelineService {
    async execute({ id}: RenewalRequest) {

        if (!id) {
            throw new Error("Id e data de renovação é obrigatório")
        }

        const timeline = await prismaClient.companyTimeline.update({
            where: {
                id: id
            },
            data: {
                check: true,
            }
        })

        return (timeline)

    }
}

export { CheckTimelineService }