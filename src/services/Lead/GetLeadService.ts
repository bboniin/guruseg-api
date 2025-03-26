import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
}

class GetLeadService {
    async execute({ id }: LeadRequest) {

        const lead = await prismaClient.lead.findUnique({
            where: {
                id: id
            }
        })

        return (lead)
    }
}

export { GetLeadService }