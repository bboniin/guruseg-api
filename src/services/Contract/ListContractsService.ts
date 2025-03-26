import prismaClient from '../../prisma'

interface ContractRequest {
    userId: string;
    lead_id: string;
}

class ListContractsService {
    async execute({ userId, lead_id }: ContractRequest) {

        const contracts = await prismaClient.contract.findMany({
            where: lead_id ? {
                user_id: userId,
                lead_id: lead_id
            } : {
                user_id: userId
            },
            orderBy: {
                update_at: "desc"
            }
        })

        return (contracts)
    }
}

export { ListContractsService }