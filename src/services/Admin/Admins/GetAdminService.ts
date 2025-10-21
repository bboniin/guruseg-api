import prismaClient from '../../../prisma'

interface ServiceRequest {
    id: string;
}

class GetCollaboratorAdminService {
    async execute({ id }: ServiceRequest) {

        const collaborator = await prismaClient.collaborator.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true,
                sector: true
            }
        })

        if (!collaborator) {
            throw new Error("Técnico não foi encontrado.")
        }

        return (collaborator)
    }
}

export { GetCollaboratorAdminService }