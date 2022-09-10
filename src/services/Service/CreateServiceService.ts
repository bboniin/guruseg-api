import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    name: string;
    description: string;
    value: number;
    commission: number;
}

class CreateServiceService {
    async execute({ name, description, value, commission }: ServiceRequest) {

        if (!name || !value || !commission) {
            throw new Error("Nome, valor e comissão é obrigátorio")
        }

        const service = await prismaClient.service.create({
            data: {
                name: name,
                value: Number(value),
                commission: Number(commission),
                visible: true,
                description: description,
            }
        })

        return (service)
    }
}

export { CreateServiceService }