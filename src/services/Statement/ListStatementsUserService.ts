import prismaClient from '../../prisma'

interface StatementRequest {
    userId: string;
}

class ListStatementsUserService {
    async execute({ userId }: StatementRequest) {
        
        const listStatements = await prismaClient.statement.findMany({
            where: {
                statement_confirms: {
                    none: {
                        user_id: userId
                    }
                }
            },
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

        return (listStatements)
    }
}

export { ListStatementsUserService }