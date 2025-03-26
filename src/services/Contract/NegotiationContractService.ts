import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
}

class NegotiationContractService {
    async execute({ id }: ContractRequest) {

        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            },
        })

        if (contract.status != "aguardando") {
            throw new Error("Contrato já assinado, expirado ou em negociação.")
        }

        const contracResusal = await prismaClient.contract.update({
            where: {
                id: contract.id
            },
            data: {
                update_at: new Date(),
                signature_date: new Date(),
                status: "negociacao"
            }
        })

        if(contracResusal.lead_id && contracResusal.is_crm){
            await prismaClient.historic.create({
                data: {
                    lead_id: contracResusal.lead_id,
                    name: "Em Negociação"
                }
            })
    
            await prismaClient.lead.update({
                where: {
                    id: contracResusal.lead_id
                },
                data: {
                    status: "Negociação",
                    update_at: new Date()
                }
            })
        }

        return (contracResusal)
    }
}

export { NegotiationContractService }