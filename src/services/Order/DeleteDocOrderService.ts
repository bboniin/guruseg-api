import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface DocRequest {
    id: string;
    type: string;
}

class DeleteDocOrderService {
    async execute({ type, id }: DocRequest) {

        if (!type || !id) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        const docFile = await prismaClient.doc.findFirst({
            where: {
                id: id,
                type: type
            },
        })

        const s3Storage = new S3Storage()
        await s3Storage.deleteFile(docFile["file"])


        const doc = await prismaClient.doc.delete({
            where: {
                id: id,
            },
        })

        return (doc)

    }
}

export { DeleteDocOrderService }