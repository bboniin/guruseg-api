import prismaClient from '../../prisma'

interface RenewalRequest {
    region: string;
}

class ListRenewalsService {
    async execute({ region }: RenewalRequest) {

        const renewals = await prismaClient.companyRenewal.findMany({
            where: {
                region: region ? region
                : {
                contains: region
                }
            },
            orderBy: {
                date_renewal: "asc"
            },
        })

        return (renewals)
    }
}

export { ListRenewalsService }