import prismaClient from '../../prisma'

interface OrderRequest {
    userId: string;
    id: number;
}

class GetOrderService {
    async execute({ userId, id }: OrderRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            },
            select: {
                name: true,
                photo: true
            }
        })

        const collaborator = await prismaClient.collaborator.findFirst({
            where: {
                id: userId
            },
            select: {
                name: true,
                photo: true
            }
        })

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
                },
                user: true,
                collaborator: true,
            }
        })

        if (!order) {
            throw new Error("Ordem de serviço não foi encontrada")
        }

        if (user) {
            if (userId != order.user.id) {
                throw new Error("Essa ordem de serviço não está vinculada a sua conta")
            }
        } else {
            if (collaborator) {
                if (order.collaborator) {
                    if (userId != order.collaborator.id) {
                        throw new Error("Essa ordem de serviço não está vinculada a sua conta")
                    }
                }
            }
        }





        return (order)
    }
}

export { GetOrderService }