import prismaClient from '../../prisma'

interface StatementRequest {
    page: number;
    userId: string;
}

class ListStatementsService {
    async execute({ page, userId }: StatementRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        let filter = {}

        const listStatementsTotal = await prismaClient.statement.count({
            where: filter,
        })

        const listStatements = await prismaClient.statement.findMany({
            where: filter,
            skip: page*30,
            take: 30,
            orderBy: {
               create_at: 'desc',
            },
            include: {
                statement_confirms: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return ({statements: listStatements, statementsTotal: listStatementsTotal})
    }
}

export { ListStatementsService }