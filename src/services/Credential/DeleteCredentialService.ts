import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    id: string;
}

class DeleteCredentialService {
    async execute({ id }: ServiceRequest) {

        const credential = await prismaClient.credential.delete({
            where: {
                id: id
            }
        })

        return (credential)
    }
}

export { DeleteCredentialService }