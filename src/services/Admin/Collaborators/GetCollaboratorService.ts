import prismaClient from '../../../prisma'

interface ServiceRequest {
    id: string;
}

class GetCollaboratorService {
    async execute({ id }: ServiceRequest) {

        const collaborator = await prismaClient.collaborator.findUnique({
            where: {
                id: id,
            },
        })

        if (!collaborator) {
            throw new Error("Técnico não foi encontrado.")
        }

        return (collaborator)
    }
}

export { GetCollaboratorService }