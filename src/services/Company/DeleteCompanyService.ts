import prismaClient from '../../prisma'

interface CompanyRequest {
    company_id: string;
    userId: string;
}

class DeleteCompanyService {
    async execute({ userId, company_id }: CompanyRequest) {

        if (!userId || !company_id) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const companyGet = await prismaClient.company.findFirst({
            where: {
                id: company_id,
                collaborador_id: userId
            },
        })

        if (!companyGet) {
            throw new Error("Formulário não encontrado")
        }

        const company = await prismaClient.company.delete({
            where: {
                id: company_id,
            },
        })

        return (company)

    }
}

export { DeleteCompanyService }