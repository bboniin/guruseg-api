import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface DocRequest {
    type: string;
    file: string;
    id: string;
}

class CreateDocService {
    async execute({ file, type, id }: DocRequest) {


        if (!file || !type || !id) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const s3Storage = new S3Storage()
        await s3Storage.saveFile(file)



        const Doc = await prismaClient.doc.create({
            data: {
                type: type,
                order_id: id,
                file: file
            },
        })

        return (Doc)

    }
}

export { CreateDocService }