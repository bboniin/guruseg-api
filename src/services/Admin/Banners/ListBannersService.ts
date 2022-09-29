import prismaClient from '../../../prisma'

interface BannerRequest {
    userId: string;
}

class ListBannersService {
    async execute({ userId }: BannerRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const banners = await prismaClient.banner.findMany()

        return (banners)
    }
}

export { ListBannersService }