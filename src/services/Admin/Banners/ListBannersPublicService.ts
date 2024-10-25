import prismaClient from '../../../prisma'

interface BannerRequest {
    type: string;
}

class ListBannersPublicService {
    async execute({ type }: BannerRequest) {

        const banners = await prismaClient.banner.findMany({
            where: {
                types: {
                    contains: type
                }
            },
            select: {
                photo: true,
                url: true
            }
        })
        
        const contracts = await prismaClient.contract.findMany()

        Promise.all(
            await contracts.map(async (item)=>{
                const lead = await prismaClient.lead.findFirst({
                    where: {
                        id: item.lead_id
                    }
                })
                if(!lead){
                    await prismaClient.contract.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            lead_id: null
                        }
                    })
                }
                if(!item.lead_id){
                    await prismaClient.contract.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            lead_id: null
                        }
                    })
                }
            })
        )

        return (banners)
    }
}

export { ListBannersPublicService }