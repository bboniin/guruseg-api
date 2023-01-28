import prismaClient from '../../prisma'

interface OrderRequest {
    observation: string;
    userId: string;
    month: string;
    urgent: boolean;
    name: string;
    sector: string;
    items: Array<[]>;
}

class CreateOrderService {
    async execute({ observation, userId, name, items, month, urgent, sector }: OrderRequest) {

        if (items.length == 0 || !userId || !month || !sector) {
            throw new Error("Preencha todos os campos.")
        }

        const order = await prismaClient.order.create({
            data: {
                observation: observation,
                user_id: userId,
                month: month,
                name: name,
                sector: sector,
                urgent: urgent
            }
        })

        order["items"] = []

        items.map(async (data) => {
            const itemOrder = await prismaClient.item.create({
                data: {
                    amount: data["amount"],
                    order_id: order.id,
                    name: data["name"],
                    value: data["value"],
                    commission: data["commission"],
                    description: data["description"]
                }
            })
            order["items"].push(itemOrder)
        })

        return (order)
    }
}

export { CreateOrderService }