import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
    userId: string;
}

class EndNegotiationContractService {
    async execute({ id, userId }: ContractRequest) {

        const contract = await prismaClient.contract.findFirst({
            where: {
                id: id,
                user_id: userId
            },
        })
        
        if (!contract) {
            throw new Error("Contrato não encontrado")
        }

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

        if(contracResusal.lead_id){
            await prismaClient.historic.create({
                data: {
                    lead_id: contracResusal.lead_id,
                    name: "Proposta reenviada para o lead"
                }
            })
    
            await prismaClient.lead.update({
                where: {
                    id: contracResusal.lead_id
                },
                data: {
                    status: "Proposta enviada",
                    update_at: new Date()
                }
            })
        }

        return (contracResusal)
    }
}

export { EndNegotiationContractService }