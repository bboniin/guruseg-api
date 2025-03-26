import prismaClient from '../../../prisma'

interface ServiceRequest {
    userId: string;
}

class ListUsersService {
    async execute({ userId }: ServiceRequest) {

        const users = await prismaClient.user.findMany({
            where: {
                visible: true
            },
            orderBy: {
                create_at: "asc"
            }
        })

        return (users)
    }
}

export { ListUsersService }