import prismaClient from '../../prisma'

interface ServiceRequest {
    userId: string;
}

class ListCollaboratorsService {
    async execute({ userId }: ServiceRequest) {

        const services = await prismaClient.collaborator.findMany({
            where: {
                visible: true
            },
            orderBy: {
                create_at: "asc",
            }
        })

        return (services)
    }
}

export { ListCollaboratorsService }