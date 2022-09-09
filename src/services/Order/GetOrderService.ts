import prismaClient from '../../prisma'

interface OrderRequest {
    userId: string;
    id: number;
}

class GetOrderService {
    async execute({ userId, id }: OrderRequest) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: id
            },
            include: {
                items: {
                    orderBy: {
                        create_at: "asc"
                    }
                },
                docs: {
                    orderBy: {
                        create_at: "asc"
                    }
                }
            }
        })

        const user = await prismaClient.user.findFirst({
            where: {
                id: order.user_id
            },
            select: {
                name: true,
                photo: true
            }
        })

        order["user"] = user

        if (order.collaborator_id) {
            const collaborator = await prismaClient.collaborator.findFirst({
                where: {
                    id: order.collaborator_id
                },
                select: {
                    name: true,
                    photo: true
                }
            })
            order["collaborator"] = collaborator
        }



        return (order)
    }
}

export { GetOrderService }