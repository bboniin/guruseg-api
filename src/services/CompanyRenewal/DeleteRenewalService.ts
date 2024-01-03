import prismaClient from '../../prisma'

interface RenewalRequest {
    id: string;
}

class DeleteRenewalService {
    async execute({ id }: RenewalRequest) {

        if (!id) {
            throw new Error("ID é obrigátorio")
        }

        const renewalGet = await prismaClient.companyRenewal.findFirst({
            where: {
                id: id,
            },
        })

        if (!renewalGet) {
            throw new Error("Empresa não encontrada")
        }

        const renewal = await prismaClient.companyRenewal.delete({
            where: {
                id: id,
            },
        })

        return (renewal)
    }
}

export { DeleteRenewalService }