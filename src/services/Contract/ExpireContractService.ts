import prismaClient from '../../prisma'

interface ContractRequest {
    userId: string;
}

class ExpireContractsService {
    async execute({ userId }: ContractRequest) {

        const contracts = await prismaClient.contract.findMany({
            where: {
                user_id: userId,
                status: "aguardando"
            },
        })

        return (contracts)
    }
}

export { ExpireContractsService }