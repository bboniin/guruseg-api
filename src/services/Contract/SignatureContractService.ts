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

            const lead = await prismaClient.lead.findUnique({
                where: {
                    id: contractSignature.lead_id
                },
                include: {
                    lead: {
                        include: {
                            leads: true
                        }
                    }
                }
              })
              
            if (lead) {
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

                await Promise.all(
                    lead.lead.leads.map(async item => {
                        if(item.id != contractSignature.lead_id){

                            await prismaClient.historic.create({
                                data: {
                                    lead_id: item.id,
                                    name: "Cliente perdido"
                                }
                            })

                            await prismaClient.lead.update({
                                where: {
                                    id: item.id
                                },
                                data: {
                                    status: "Cliente Perdido"
                                }
                            });    
                        }
                      
                    })
                );
            }
        }

        return (contractSignature)
    }
}

export { SignatureContractService }