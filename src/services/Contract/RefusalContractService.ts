import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
}

class RefusalContractService {
    async execute({ id }: ContractRequest) {

        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            },
        })

        if (contract.status != "aguardando") {
            throw new Error("Contrato já assinado ou expirado.")
        }

        const contracResusal = await prismaClient.contract.update({
            where: {
                id: contract.id
            },
            data: {
                update_at: new Date(),
                signature_date: new Date(),
                status: "recusado"
            }
        })

        if(contracResusal.lead_id && contracResusal.is_crm){
            await prismaClient.historic.create({
                data: {
                    lead_id: contracResusal.lead_id,
                    name: "Cliente perdido"
                }
            })
    
            await prismaClient.lead.update({
                where: {
                    id: contracResusal.lead_id
                },
                data: {
                    status: "Cliente Perdido",
                    update_at: new Date()
                }
            })
        }

        return (contracResusal)
    }
}

export { RefusalContractService }