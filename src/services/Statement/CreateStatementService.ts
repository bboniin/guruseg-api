import prismaClient from '../../prisma';

interface StatementRequest {
    title: string;
    description: string;
    userId: string;
}
class CreateStatementService {
    async execute({ title, description, userId }: StatementRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        if (!title || !description) {
            throw new Error("Preencha titulo e descrição para salvar")
        }

        const statement = await prismaClient.statement.create({
            data: {
                title: title,
                description: description,
            }
        })

        return (statement)
    }
}

export { CreateStatementService }