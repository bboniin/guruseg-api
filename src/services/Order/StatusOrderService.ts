import prismaClient from '../../prisma'

interface OrderRequest {
    id: number;
    userId: string;
    status: string;
    message: string;
}


class StatusOrderService {
    async execute({ id, userId, status, message }: OrderRequest) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: id
            },
        })

        if (order.status == "aberto" || order.status == "finalizado") {
            throw new Error("Ordem de serviço está aberta ou já foi finalizada.")
        }

        const orderD = await prismaClient.order.update({
            where: {
                id: id
            },
            data: {
                status: status,
                message: message,
            }
        })
        return (orderD)
    }
}

export { StatusOrderService }