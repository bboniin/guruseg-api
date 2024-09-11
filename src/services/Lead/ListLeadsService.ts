import prismaClient from '../../prisma'

interface LeadRequest {
    page: number;
    status: string;
    all: boolean;
    userId: string;
}

class ListLeadsService {
    async execute({ page, userId, status, all }: LeadRequest) {

        let filter = {}

        if(userId){
            if(userId == "Sem Franqueado"){
                filter["user_id"] = null
            }else{
                filter["user_id"] = userId
            }
        }

        if(status){
            filter["status"] = status
        }

        const listLeadsTotal = await prismaClient.lead.count({
            where: filter,
        })

        if(all){

            const listLeads = await prismaClient.lead.findMany({
                where: {
                    user_id: null,
                },
                orderBy: {
                    create_at: "asc"
                },
            })

            return (listLeads)

        }else{

            const listLeads = await prismaClient.lead.findMany({
                where: filter,
                skip: page,
                take: 30,
                orderBy: {
                    create_at: "asc"
                },
                include: {
                    user: true,
                    historical: {
                        orderBy: {
                            create_at: "asc"
                        }
                    }
                }
            })

            return ({leads: listLeads, leadsTotal: listLeadsTotal})
                
        }
    }
}

export { ListLeadsService }