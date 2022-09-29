import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface BannerRequest {
    photo: string;
    userId: string;
    url: string;
}

class CreateBannerService {
    async execute({ url, userId, photo }: BannerRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        if (!url || !photo) {
            throw new Error("Preencha a Url e a Imagem do banner")
        }

        const s3Storage = new S3Storage()
        await s3Storage.saveFile(photo)


        const bannerRes = await prismaClient.banner.create({
            data: {
                url: url,
                photo: photo
            }
        })

        return (bannerRes)

    }
}

export { CreateBannerService }