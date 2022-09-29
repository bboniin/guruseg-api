import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface BannerRequest {
    photo: string;
    userId: string;
    url: string;
    id: string;
}

class EditBannerService {
    async execute({ url, userId, photo, id }: BannerRequest) {

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

        if (!url) {
            throw new Error("Preencha a Url do banner")
        }

        if (!banner) {
            throw new Error("Banner não existe")
        }

        let data = {
            url: url
        }

        if (photo) {
            const s3Storage = new S3Storage()

            if (banner["photo"]) {
                await s3Storage.deleteFile(banner["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const bannerRes = await prismaClient.banner.update({
            where: {
                id: id
            },
            data: data
        })

        return (bannerRes)

    }
}

export { EditBannerService }