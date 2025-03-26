import prismaClient from '../../prisma'

interface StatementRequest {
    id: string;
    userId: string;
}

class DeleteStatementService {
    async execute({ id, userId }: StatementRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const statement = await prismaClient.statement.findFirst({
            where: {
                id: id,
            }
        })

        if (!statement) {
            throw new Error("Comunicado não encontrado")
        }

        await prismaClient.statement.delete({
            where: {
                id: id,
            },
        })

        return "Deletado com sucesso"
    }
}

export { DeleteStatementService }