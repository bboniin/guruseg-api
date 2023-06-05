import prismaClient from '../../prisma'

interface CollaboratorRequest {
    userId: string;
}

class GetCollaboratorService {
    async execute({ userId }: CollaboratorRequest) {

        const collaborator = await prismaClient.collaborator.findUnique({
            where: {
                id: userId
            }
        })
        
        return (collaborator)

    }
}

export { GetCollaboratorService }