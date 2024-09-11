import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ServiceRequest {
    name: string;
    description: string;
    value: string;
    id: string;
    commission: number;
    sector: string;
}

class EditServiceService {
    async execute({ name, id, description, value, commission, sector }: ServiceRequest) {

        if (!name || !value || !commission || !sector) {
            throw new Error("Nome, valor, setor e comissão é obrigatório")
        }

        let data = {
            name: name,
            description: description,
            sector: sector,
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