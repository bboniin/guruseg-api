import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
    signature: string;
}

class SignatureContractService {
    async execute({ id, signature }: ContractRequest) {

        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            },
        })

        if (contract.status != "aguardando") {
            throw new Error("Contrato já assinado ou expirado.")
        }

        const contractSignature = await prismaClient.contract.update({
            where: {
                id: contract.id
            },
            data: {
                status: "assinado",
                signature: signature,
                update_at: new Date(),
                signature_date: new Date()
            }
        })

        if(contractSignature.lead_id){
            await prismaClient.historic.create({
                data: {
                    lead_id: contractSignature.lead_id,
                    name: "Cliente fechado"
                }
            })
    
            await prismaClient.lead.update({
                where: {
                    id: contractSignature.lead_id
                },
                data: {
                    status: "Cliente Fechado",
                    update_at: new Date()
                }
            })
        }

        return (contractSignature)
    }
}

export { SignatureContractService }