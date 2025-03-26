import prismaClient from '../../prisma'

class ListServicesAdminService {
    async execute() {

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

export { ListServicesAdminService }