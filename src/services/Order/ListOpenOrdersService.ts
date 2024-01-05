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
        let whereData = {}
        if (collaborator.sector == "Todos") {
            whereData = { status: "aberto" }
        } else {
            whereData = {
                sector: collaborator.sector,
                status: "aberto",
            }
        }

        if (collaborator.user_id) {
            whereData["user_id"] = collaborator.user_id
        }

        const orders = await prismaClient.order.findMany({
            where: whereData,
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