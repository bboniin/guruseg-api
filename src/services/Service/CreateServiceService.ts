import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    name: string;
    description: string;
    value: number;
}

class CreateServiceService {
    async execute({ name, description, value }: ServiceRequest) {

        if (!name || !value) {
            throw new Error("Nome e valor é obrigátorio")
        }

        const service = await prismaClient.service.create({
            data: {
                name: name,
                value: Number(value),
                visible: true,
                description: description,
            }
        })

        return (service)
    }
}

export { CreateServiceService }