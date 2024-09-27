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
                if(status){
                    filter["leads"] = {
                        none: {},
                        some: {
                            status: status
                        }
                    }
                }else{
                    filter["leads"] = {
                        none: {},
                    }
                }
            }else{
                if(status){
                    filter["leads"] = {
                        some: {
                            user_id: userId,
                            status: status
                        }
                    }
                }else{
                    filter["leads"] = {
                        some: {
                            user_id: userId
                        }
                    }
                }
            }
        }else{
            if(status){
                filter["leads"] = {
                    some: {
                        status: status
                    }
                }
            }
        }

        const listLeadsTotal = await prismaClient.leadMaster.count({
            where: filter,
        })

        const listLeads = await prismaClient.leadMaster.findMany({
            where: filter,
            skip: page,
            take: 30,
            orderBy: {
                create_at: "asc"
            },
            include: {
                leads: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        create_at: "asc"
                    }
                }
            }
        })

        return ({leads: listLeads, leadsTotal: listLeadsTotal})
    }
}

export { ListLeadsService }