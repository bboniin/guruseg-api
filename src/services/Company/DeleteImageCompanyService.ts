import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ImageRequest {
    id: string;
}

class DeleteImageCompanyService {
    async execute({ id }: ImageRequest) {

        if (!id) {
            throw new Error("Id da imagem é obrigatório")
        }

        const image = await prismaClient.companyImages.findFirst({
            where: {
                id: id,
            },
        })

        const s3Storage = new S3Storage()
        await s3Storage.deleteFile(image["photo"])


        const imageDelete = await prismaClient.companyImages.delete({
            where: {
                id: id,
            },
        })

        return (imageDelete)

    }
}

export { DeleteImageCompanyService }