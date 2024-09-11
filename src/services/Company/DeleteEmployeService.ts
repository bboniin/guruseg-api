import prismaClient from '../../prisma'

interface CompanyRequest {
    employe_id: string;
    userId: string;
}

class DeleteEmployeService {
    async execute({ userId, employe_id }: CompanyRequest) {

        if (!userId || !employe_id) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        const companyEmployeGet = await prismaClient.companyEmployees.findFirst({
            where: {
                id: employe_id,
            },
        })

        if (!companyEmployeGet) {
            throw new Error("Função já deletada não encontrado")
        }

        const companyEmploye = await prismaClient.companyEmployees.delete({
            where: {
                id: employe_id,
            },
        })

        return (companyEmploye)

    }
}

export { DeleteEmployeService }