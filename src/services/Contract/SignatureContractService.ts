import prismaClient from '../../prisma'

interface ContractRequest {
    id: string;
    signature: string;
}

class SignatureContractService {
    async execute({ id, signature }: ContractRequest) {

        const contract = await prismaClient.contract.findUnique({
            where: {
                id: id
            },
        })

        if (contract.status != "aguardando") {
            throw new Error("Contrato já assinado ou expirado.")
        }

        const contractSignature = await prismaClient.contract.update({
            where: {
                id: contract.id
            },
            data: {
                status: "assinado",
                signature: signature,
                signature_date: new Date()
            }
        })

        return (contractSignature)
    }
}

export { SignatureContractService }