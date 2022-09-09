import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    id: string;
}

class DeleteServiceService {
    async execute({ id }: ServiceRequest) {

        const service = await prismaClient.service.update({
            where: {
                id: id
            },
            data: {
                visible: false
            }

        })
        return (service)
    }
}

export { DeleteServiceService }