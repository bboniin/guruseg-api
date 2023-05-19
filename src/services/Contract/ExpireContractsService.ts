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
            if (differenceInDays(item.create_at, new Date()) <= -2) {
                await prismaClient.contract.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        status: "expirado",
                        update_at: new Date(),
                    }
                })
            }
        })
        return ""
    }
}

export { ExpireContractsService }