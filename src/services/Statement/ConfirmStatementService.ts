import prismaClient from '../../prisma'

interface StatementRequest {
    userId: string;
    id: string;
}

class ConfirmStatementService {
    async execute({ userId, id }: StatementRequest) {

        const statementGet = await prismaClient.statement.findUnique({
            where: {
                id: id,
            }
        })

        if (!statementGet) {
            throw new Error("Comunicado não encontrado")
        }

        const confirmGet = await prismaClient.statementConfirm.findFirst({
            where: {
                statement_id: id,
                user_id: userId
            }
        })

        if (confirmGet) {
            throw new Error("Comunicado já foi confirmado")
        }

        const statement = await prismaClient.statementConfirm.create({
            data: {
                statement_id: id,
                user_id: userId,
                date: new Date()
            }
        })

        return (statement)

    }
}

export { ConfirmStatementService }