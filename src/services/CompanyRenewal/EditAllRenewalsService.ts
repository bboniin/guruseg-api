import prismaClient from '../../prisma'

interface RenewalRequest {
    newRegion: string;
    region: string;
}

class EditAllRenewalsService {
    async execute({ region, newRegion }: RenewalRequest) {

        if (!newRegion || !region) {
            throw new Error("Preencha todos os campos")
        }

        const renewalRes = await prismaClient.companyRenewal.updateMany({
            where: {
                region: region
            },
            data: {
                region: newRegion,
            }
        })

        return (renewalRes)

    }
}

export { EditAllRenewalsService }