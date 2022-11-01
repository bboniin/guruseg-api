import prismaClient from '../../prisma'

interface ContractRequest {
    user_id: string;
    userId: string;
}

class AdminListContractsService {
    async execute({ user_id, userId }: ContractRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const contracts = await prismaClient.contract.findMany({
            where: {
                user_id: user_id
            },
        })

        return (contracts)
    }
}

export { AdminListContractsService }