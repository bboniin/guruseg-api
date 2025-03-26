import prismaClient from '../../prisma'

interface StatementRequest {
    title: string;
    description: string;
    id: string;
    userId: string;
}

class EditStatementService {
    async execute({ description, title, id, userId }: StatementRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const statementGet = await prismaClient.statement.findUnique({
            where: {
                id: id,
            }
        })

        if (!statementGet) {
            throw new Error("Comunicado não encontrado")
        }

        if (!title || !description) {
            throw new Error("Preencha titulo e descrição para salvar")
        }
        
        const statement = await prismaClient.statement.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description
            }
        })

        return (statement)

    }
}

export { EditStatementService }