import prismaClient from '../../prisma'

interface CompanyRequest {
    observation: string;
    userId: string;
    company_id: string
}

class HandlerCompanyService {
    async execute({ observation, userId, company_id }: CompanyRequest) {

        if (!observation || !userId || !company_id) {
            throw new Error("Deixa uma observação para a empresa")
        }

        const companyGet = await prismaClient.company.findFirst({
            where: {
                id: company_id,
                collaborador_id: userId
            }
        })  

        if (!companyGet) {
            throw new Error("Empresa não encontrada")
        }
        
        const company = await prismaClient.company.update({
            where: {
                id: company_id,
            },
            data: {
                observation: observation,
                status: "alteracao"
            }
        })  
       
       return (company)
    }
}

export { HandlerCompanyService }