import prismaClient from '../../prisma'

interface CompanyRequest {
    company_id: string;
}

class GetCompanyService {
    async execute({ company_id }: CompanyRequest) {

        const company = await prismaClient.company.findUnique({
            where: {
                id: company_id
            },
            include: {
                companySector: {
                    orderBy: {
                        create_at: "asc"
                    },
                    include: {
                        companyEmployees: {
                            orderBy: {
                                create_at: "asc"
                            },
                        },
                        companyScratchs: {
                            orderBy: {
                                create_at: "asc"
                            },
                        }
                    }
                },
            }
        })

        return (company)
    }
}

export { GetCompanyService }