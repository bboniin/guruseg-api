import { addDays } from 'date-fns';
import prismaClient from '../../../prisma'

interface ServiceRequest {
    userId: string;
}

class ListCollaboratorsService {
    async execute({ userId }: ServiceRequest) {

        const tecnicos = await prismaClient.collaborator.findMany({
            where: {
                visible: true
            },
            orderBy: {
                create_at: "asc",
            }
        })

        let tecnicosTotal = {}

        tecnicos.map((item) => {
            tecnicosTotal[item.id] = {
                ...item, total: 0
            }
        })

        const oss = await prismaClient.order.findMany({
            where: {
                create_at: {
                    gte: addDays(new Date(),-7)
                }
            },
            include: {
                items: true,
            },
            orderBy: {
                create_at: "asc",
            }
        })

        oss.map((item) => {
            let total = 0
            item.items.map((item) => {
                total += item.amount * item.value
            })
            if (tecnicosTotal[item.collaborator_id]) {
                tecnicosTotal[item.collaborator_id].total += total
            }
        })
        

        return (Object.values(tecnicosTotal))
    }
}

export { ListCollaboratorsService }