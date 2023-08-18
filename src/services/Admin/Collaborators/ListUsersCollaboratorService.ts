import prismaClient from '../../../prisma'

interface ServiceRequest {
    userId: string;
    collaborator_id: string;
}

class ListUsersCollaboratorService {
    async execute({ userId, collaborator_id }: ServiceRequest) {

        const users = await prismaClient.user.findMany({
            where: {
                collaborator_id: collaborator_id,
                visible: true
            },
            orderBy: {
                create_at: "asc",
            }
        })

        return (users)
    }
}

export { ListUsersCollaboratorService }