import prismaClient from '../../prisma'

interface OrderRequest {
    observation: string;
    userId: string;
    month: string;
    urgent: boolean;
    name: string;
    company_id: string;
    sector: string;
    items: Array<[]>;
}

class CreateOrderService {
    async execute({ observation, userId, name, items, month, urgent, sector, company_id }: OrderRequest) {

        if (items.length == 0 || !userId || !month || !sector) {
            throw new Error("Preencha todos os campos.")
        }

        const order = await prismaClient.order.create({
            data: {
                observation: observation,
                user_id: userId,
                month: month,
                name: name,
                company_id: company_id,
                sector: sector,
                urgent: urgent,
                status: "pendente"
            }
        })  

        console.log(company_id)
        if (company_id) {
            let company = await prismaClient.company.update({
                where: {
                    id: company_id
                },
                data: {
                    order_id: order.id
                }
            })
            console.log(company)
        }

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