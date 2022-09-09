import prismaClient from '../../prisma'

interface OrderRequest {
    id: number;
    userId: string;
}

class AcceptOrderService {
    async execute({ id, userId }: OrderRequest) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: id
            },
        })

        if (!order) {
            throw new Error("Ordem de serviço já excluida.")
        }

        if (order.collaborator_id) {
            throw new Error("Ordem de serviço já foi aceita por outro técnico.")
        }

        const orderD = await prismaClient.order.update({
            where: {
                id: id
            },
            data: {
                status: "andamento",
                collaborator_id: userId
            }
        })
        return (orderD)
    }
}

export { AcceptOrderService }