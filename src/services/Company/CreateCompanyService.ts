import prismaClient from '../../prisma'

interface CompanyRequest {
    observation: string;
    userId: string;
    razao_social: string;
}

class CreateCompanyService {
    async execute({ observation, userId, razao_social }: CompanyRequest) {

        if (!razao_social || !userId) {
            throw new Error("Preencha o nome da empresa.")
        }

        const company = await prismaClient.company.create({
            data: {
                observation: observation,
                collaborador_id: userId,
                razao_social: razao_social,
                status: "aguardando"
            }
        })  
       
       return (company)
    }
}

export { CreateCompanyService }