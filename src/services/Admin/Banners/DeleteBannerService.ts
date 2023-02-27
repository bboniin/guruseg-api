import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

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

        const banner = await prismaClient.banner.findUnique({
            where: {
                id: id
            },
        })

        if (banner["photo"]) {
            const s3Storage = new S3Storage()
            await s3Storage.deleteFile(banner["photo"])
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