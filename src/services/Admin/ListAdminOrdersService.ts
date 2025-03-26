import { endOfDay, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface OrderRequest {
    id: string;
    type: string;
    finance: boolean;
    startDate: Date;
    endDate: Date;
}

class ListAdminOrdersService {
    async execute({ id, type, finance, startDate, endDate }: OrderRequest) {

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

        
        if (finance) {
            data["status"] = "finalizado"
            data["AND"] = [
                {
                    update_at: {
                        gte: startOfDay(startDate)
                    }
                },
                {
                    update_at: {
                        lte: endOfDay(endDate)
                }
            }]
        } else {
            data["AND"] = [
                {
                  create_at: {
                    gte: startOfDay(startDate)
                  }
                },
                {
                  create_at: {
                    lte: endOfDay(endDate)
                  }
            }]
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