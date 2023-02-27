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

        return (banners)
    }
}

export { ListBannersPublicService }