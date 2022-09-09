import prismaClient from '../../prisma'

interface OrderRequest {
    userId: string;
    type: string;
    month: string
}

class ListOrdersService {
    async execute({ userId, type, month }: OrderRequest) {

        let data = {}

        if (type == "cliente") {
            data = {
                user_id: userId
            }
        } else {
            if (type == "tecnico") {
                data = {
                    collaborator_id: userId
                }
            } else {
                throw new Error("Nenhum tipo de usuário foi enviado.")
            }
        }

        if (month && month != "undefined") {
            data["month"] = month
            data["status"] = "finalizado"
        }

        const orders = await prismaClient.order.findMany({
            where: data,
            orderBy: {
                create_at: "desc"
            },
            include: {
                items: {
                    orderBy: {
                        create_at: "asc"
                    }
                }, docs: {
                    orderBy: {
                        create_at: "asc"
                    }
                }
            }
        })

        return (orders)
    }
}

export { ListOrdersService }