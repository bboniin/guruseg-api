import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
}

class DeleteLeadService {
    async execute({ id }: LeadRequest) {

        const lead = await prismaClient.lead.delete({
            where: {
                id: id
            },
            include: {
                leadMaster: true
            }
        })

        if(lead.leadMaster.is_user){
            await prismaClient.leadMaster.delete({
                where: {
                    id: lead.leadMaster.id
                }
            })
        }

        return (lead)
    }
}

export { DeleteLeadService }