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

        if(!contract){  
            throw new Error("Contrato não encontrado")
        }

        return (contract)
    }
}

export { GetContractService }