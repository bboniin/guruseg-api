import prismaClient from '../../prisma'

interface CompanyRequest {
    userId: string;
}

class ListCompaniesConfirmService {
    async execute({ userId }: CompanyRequest) {


        const companies = await prismaClient.company.findMany({
            where: {
                collaborador_id: userId,
                status: "confirmado",
                order_id: 0
            },
            orderBy: {
                update_at: "desc"
            },
            include: {
                companySector: {
                    orderBy: {
                        create_at: "asc"
                    }
                },
            }
        })


        return (companies)
    }
}

export { ListCompaniesConfirmService }