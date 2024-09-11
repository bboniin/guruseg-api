import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
}

class DeleteLeadService {
    async execute({ id }: LeadRequest) {

        const lead = await prismaClient.lead.delete({
            where: {
                id: id
            }
        })
        return (lead)
    }
}

export { DeleteLeadService }