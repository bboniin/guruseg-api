import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    name: string;
    description: string;
    value: string;
    id: string;
}

class EditServiceService {
    async execute({ name, id, description, value }: ServiceRequest) {

        if (!name || !value) {
            throw new Error("Nome e valor é obrigátorio")
        }

        let data = {
            name: name,
            description: description,
            value: Number(value)
        }

        const service = await prismaClient.service.update({
            where: {
                id: id
            },
            data: data
        })

        return (service)
    }
}

export { EditServiceService }