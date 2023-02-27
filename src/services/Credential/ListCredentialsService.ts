import prismaClient from '../../prisma'

class ListCredentialsService {
    async execute() {

        const credentials = await prismaClient.credential.findMany({
            where: {
                enabled: true,
                visible: true
            },
            orderBy: {
                update_at: "desc"
            },
            select: {
                email: true,
                name: true,
                phone_number: true,
                state: true,
                city: true,
                services: true,
                served_cities: true,
                profession: true,
                description: true,
                photo: true,
                enabled: true,
                visible: true,
                id: true
            }
        })

        return (credentials)
    }
}

export { ListCredentialsService }