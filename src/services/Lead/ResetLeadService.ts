import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
}

class ResetLeadService {
    async execute({ id }: LeadRequest) {

        const leadGet = await prismaClient.lead.findUnique({
            where: {
                id: id
            }
        })

        if(!leadGet){
            throw new Error("Lead não encontrado")
        }

        const lead = await prismaClient.lead.update({
            where: {
                id: id
            },
            data: {
                status: "Abordagem",
                contract_id: "",
                update_at: new Date()
            }
        })

        await prismaClient.historic.create({
            data: {
                lead_id: id,
                name: "Resetado"
            }
        })

        await prismaClient.contract.updateMany({
            where: {
                lead_id: id
            }, 
            data: {
                lead_id: null
            }
        }) 

        return (lead)
    }
}

export { ResetLeadService }