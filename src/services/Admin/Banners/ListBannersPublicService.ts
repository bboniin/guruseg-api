import prismaClient from '../../../prisma'

class ListBannersPublicService {
    async execute() {

        const banners = await prismaClient.banner.findMany({
            select: {
                photo: true,
                url: true
            }
        })

        return (banners)
    }
}

export { ListBannersPublicService }