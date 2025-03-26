import prismaClient from '../../prisma'

interface StatementRequest {
    id: string;
    userId: string;
}

class GetStatementService {
    async execute({ id, userId }: StatementRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const statement = await prismaClient.statement.findUnique({
            where: {
                id: id,
            },
            include: {
                statement_confirms: {
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!statement) {
            throw new Error("Comunicado não encontrado")
        }

        return (statement)

    }
}

export { GetStatementService }