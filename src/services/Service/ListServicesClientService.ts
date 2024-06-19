import prismaClient from '../../prisma'

interface ServiceRequest {
    userId: string;
}

class ListServicesClientService {
    async execute({ userId }: ServiceRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        let servicesFilter = []

        if(user.services){
            user.services.split(";").map((item)=>{
                if(item){
                    servicesFilter.push({
                        id: item
                    })
                }
            })
        }

        const services = await prismaClient.service.findMany({
            where: user.services ? {
                visible: true,
                OR: servicesFilter
            } : {
                visible: true
            },
            orderBy: {
                create_at: "asc"
            }
        })

        return (services)
    }
}

export { ListServicesClientService }