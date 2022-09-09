import prismaClient from '../../prisma'

interface ServiceRequest {
    userId: string;
}

class ListServicesService {
    async execute({ userId }: ServiceRequest) {

        const services = await prismaClient.service.findMany({
            where: {
                visible: true
            },
            orderBy: {
                create_at: "asc"
            }
        })

        return (services)
    }
}

export { ListServicesService }