import prismaClient from '../../prisma'

interface ContractRequest {
    userId: string;
}

class ListContractsService {
    async execute({ userId }: ContractRequest) {

        const contracts = await prismaClient.contract.findMany({
            where: {
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