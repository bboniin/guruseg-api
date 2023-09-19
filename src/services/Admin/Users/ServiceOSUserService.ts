import prismaClient from '../../../prisma'

interface ServiceRequest {
    id: string;
    service: string;
    start_date: Date;
    end_date: Date;
}

class ServiceOSUserService {
    async execute({ id, start_date, service, end_date }: ServiceRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true,
                course: true,
                resale: true
            }
        })

        if (!user) {
            throw new Error("Franqueado não foi encontrado.")
        }

        const orders = await prismaClient.order.findMany({
            where: {
                status: "finalizado",
                AND: [
                    {
                      update_at: {
                        gte: start_date
                      }
                    },
                    {
                      update_at: {
                        lte: end_date
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

        let servicoOS = 0

        orders.map((item) => {
            item.items.map((data) => {
                if (data.name == service) {
                    servicoOS += data.amount
                }
            })
        })

        return (servicoOS)
    }
}

export { ServiceOSUserService }