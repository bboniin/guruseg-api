import prismaClient from '../../prisma'

interface OrderRequest {
    userId: string;
}

class ListOpenOrdersService {
    async execute({ userId }: OrderRequest) {

        const collaborator = await prismaClient.collaborator.findFirst({
            where: {
                id: userId
            }
        })

        const orders = await prismaClient.order.findMany({
            where: {
                sector: collaborator.sector,
                status: "aberto",
            },
            orderBy: {
                urgent: "desc",
            },
            include: {
                items: {
                    orderBy: {
                        create_at: "asc"
                    },
                    select: {
                        amount: true
                    }
                }
            }
        })

        return (orders)
    }
}

export { ListOpenOrdersService }