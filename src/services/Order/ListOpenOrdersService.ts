import prismaClient from '../../prisma'

interface OrderRequest {
    userId: string;
}

class ListOpenOrdersService {
    async execute({ userId }: OrderRequest) {

        const orders = await prismaClient.order.findMany({
            where: {
                status: "aberto",
            },
            orderBy: {
                create_at: "desc",

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