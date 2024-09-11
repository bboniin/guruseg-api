import { differenceInDays } from 'date-fns';
import prismaClient from '../../prisma'

class ExpireContractsService {
    async execute() {

        const contracts = await prismaClient.contract.findMany({
            where: { 
                status: "aguardando" 
            },
        })

        contracts.map(async (item) => {
            if (differenceInDays(item.create_at, new Date()) <= -59) {
                await prismaClient.contract.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        status: "expirado",
                        update_at: new Date(),
                    }
                })

                if(item.lead_id){
                    await prismaClient.historic.create({
                        data: {
                            lead_id: item.lead_id,
                            name: "Proposta expirou, Cliente perdido"
                        }
                    })
            
                    await prismaClient.lead.update({
                        where: {
                            id: item.lead_id
                        },
                        data: {
                            status: "Cliente Perdido",
                            update_at: new Date()
                        }
                    })
                }
            }
        })


        return ""
    }
}

export { ExpireContractsService }