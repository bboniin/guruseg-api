import prismaClient from '../../prisma'

interface ServiceRequest {
    id: string;
}

class DeleteContractService {
    async execute({ id }: ServiceRequest) {
        
        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            }
        })

        if(contract["status"] == "assinado"){
            throw new Error("Contrato assinado não pode ser deletado")
        }

        await prismaClient.contract.delete({
            where: {
                id: id
            }
        })

        return (contract)
    }
}

export { DeleteContractService }