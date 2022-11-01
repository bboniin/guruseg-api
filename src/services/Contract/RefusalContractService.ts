import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
}

class RefusalContractService {
    async execute({ id }: ContractRequest) {

        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            },
        })

        if (contract.status != "aguardando") {
            throw new Error("Contrato já assinado ou expirado.")
        }

        const contracResusal = await prismaClient.contract.update({
            where: {
                id: contract.id
            },
            data: {
                signature_date: new Date(),
                status: "recusado"
            }
        })


        return (contracResusal)
    }
}

export { RefusalContractService }