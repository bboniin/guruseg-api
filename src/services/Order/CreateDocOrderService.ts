import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface OrderRequest {
    id: number;
    type: string;
    file: string;
}

class CreateDocOrderService {
    async execute({ id, type, file }: OrderRequest) {

        if (!type || !id || !file) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const s3Storage = new S3Storage()
        await s3Storage.saveFile(file)


        const order = await prismaClient.doc.create({
            data: {
                order_id: id,
                type: type,
                file: file
            },
        })

        return (order)
    }
}

export { CreateDocOrderService }