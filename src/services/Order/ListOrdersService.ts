import { endOfDay, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface OrderRequest {
    userId: string;
    type: string;
    finance: boolean;
    startDate: Date;
    endDate: Date;
}

class ListOrdersService {
    async execute({ userId, type, finance, startDate, endDate }: OrderRequest) {

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
                update_at: "desc"
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

        const statusC = {
            "aberto": 0,
            "andamento": 0,
            "pendente": 0,
            "validacao": 0,
            "alteracao": 0,
            "finalizado": 1,
            "cancelado": 1,
            "recusado": 1
        }

        let ordersStatus = orders.sort(function (a, b) {
            return statusC[a.status] < statusC[b.status] ? -1 : statusC[a.status] > statusC[b.status] ? 1 : 0;
        })

        return (ordersStatus)
    }
}

export { ListOrdersService }