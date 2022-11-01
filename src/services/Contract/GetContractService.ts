import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
}

class GetContractService {
    async execute({ id }: ContractRequest) {

        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            },
            include: {
                services: true
            }
        })

        return (contract)
    }
}

export { GetContractService }