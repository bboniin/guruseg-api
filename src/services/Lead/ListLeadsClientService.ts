import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
}

class ListLeadsClientService {
    async execute({ userId }: LeadRequest) {

        const leads = await prismaClient.lead.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                update_at: "asc"
            },
            include: {
                historical: {
                    orderBy: {
                        create_at: "asc"
                    }
                }
            }
        })

        return (leads)
    }
}

export { ListLeadsClientService }