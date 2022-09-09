import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface OrderRequest {
    observation: string;
    userId: string;
    month: string;
    items: Array<[]>;
}

class CreateOrderService {
    async execute({ observation, userId, items, month }: OrderRequest) {

        if (items.length == 0 || !userId || !month) {
            throw new Error("Preencha todos os campos.")
        }

        const order = await prismaClient.order.create({
            data: {
                observation: observation,
                user_id: userId,
                month: month
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
                    description: data["description"]
                }
            })
            order["items"].push(itemOrder)
        })

        return (order)
    }
}

export { CreateOrderService }