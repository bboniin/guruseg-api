import prismaClient from '../../../prisma'

interface CollaboratorRequest {
    id: string;
}

class DeleteCollaboratorService {
    async execute({ id }: CollaboratorRequest) {

        const service = await prismaClient.collaborator.update({
            where: {
                id: id
            },
            data: {
                visible: false,
                email: id
            }

        })
        return (service)
    }
}

export { DeleteCollaboratorService }