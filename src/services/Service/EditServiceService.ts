import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    name: string;
    description: string;
    value: string;
    id: string;
    commission: number;
}

class EditServiceService {
    async execute({ name, id, description, value, commission }: ServiceRequest) {

        if (!name || !value || !commission) {
            throw new Error("Nome, valor e comissão é obrigátorio")
        }

        let data = {
            name: name,
            description: description,
            value: Number(value),
            commission: Number(commission)
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