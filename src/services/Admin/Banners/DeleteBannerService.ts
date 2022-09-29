import prismaClient from '../../../prisma'

interface BannerRequest {
    userId: string;
    id: string;
}

class DeleteBannerService {
    async execute({ userId, id }: BannerRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const banners = await prismaClient.banner.delete({
            where: {
                id: id,
            },
        })

        return (banners)
    }
}

export { DeleteBannerService }