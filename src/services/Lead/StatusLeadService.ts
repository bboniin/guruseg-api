import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
    status: string;
    label: string;
}

class StatusLeadService {
    async execute({ id, status, label }: LeadRequest) {

        if (!status) {
            throw new Error("Status é obrigatório")
        }

        await prismaClient.historic.create({
            data: {
                lead_id: id,
                name: label
            }
        })

        const lead = await prismaClient.lead.update({
            where: {
                id: id
            },
            data: {
                status: status,
                update_at: new Date()
            }
        })

        return (lead)
    }
}

export { StatusLeadService }