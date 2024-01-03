import { endOfHour, startOfHour } from 'date-fns';
import prismaClient from '../../prisma'

interface OrderRequest {
    start_date: Date;
    end_date: Date;
}

class ListAdminOrdersPeriodoService {
    async execute({ start_date, end_date }: OrderRequest) {
        
        const orders = await prismaClient.order.findMany({
            where: {
                AND: [
                    {
                      create_at: {
                        gte: startOfHour(new Date(start_date))
                      }
                    },
                    {
                      create_at: {
                        lte: endOfHour(new Date(end_date))
                      }
                    }
                ]
            },
            orderBy: {
                create_at: "desc"
            },
            include: {
                items: {
                    orderBy: {
                        create_at: "asc"
                    }
                }
            }
        })

        return (orders)
    }
}

export { ListAdminOrdersPeriodoService }