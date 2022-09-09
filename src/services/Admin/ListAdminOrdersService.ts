import prismaClient from '../../prisma'

interface OrderRequest {
    id: string;
    type: string;
    month: string
}

class ListAdminOrdersService {
    async execute({ id, type, month }: OrderRequest) {

        let data = {}

        if (type == "cliente") {
            data = {
                user_id: id
            }
        } else {
            if (type == "tecnico") {
                data = {
                    collaborator_id: id
                }
            } else {
                throw new Error("Nenhum tipo de usuário foi enviado.")
            }
        }

        if (month && month != "undefined") {
            data["month"] = month
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

export { ListAdminOrdersService }