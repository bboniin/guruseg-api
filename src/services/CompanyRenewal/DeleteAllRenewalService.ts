import prismaClient from '../../prisma'


class DeleteAllRenewalService {
    async execute() {

        const renewal = await prismaClient.companyRenewal.deleteMany()

        return (renewal)
    }
}

export { DeleteAllRenewalService }