import prismaClient from '../../prisma'

interface TimelineRequest {
    region: string;
}

class ListTimelinesService {
    async execute({ region }: TimelineRequest) {
        
        let filter = {
            check: false
        }

        if (region) {
            filter["renewal"] = {
                region: region
            }
        }

        const timelines = await prismaClient.companyTimeline.findMany({
            where: filter,
            orderBy: {
                date_reminder: "asc"
            },
            include: {
                renewal: true
            }
        })

        return (timelines)
    }
}

export { ListTimelinesService }