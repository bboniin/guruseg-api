import { isAfter } from 'date-fns';
import prismaClient from '../../prisma'

interface RenewalRequest {
    date_renewal: Date;
    id: string;
    observation: string;
}
class CheckRenewalService {
    async execute({ id, observation, date_renewal}: RenewalRequest) {

        if (!date_renewal || !id) {
            throw new Error("Id e data de renovação é obrigatório")
        }
    
        if (isAfter(new Date(), date_renewal)) {
            throw new Error("Nova data de renovação está no passado")
        }

        const renewalRes = await prismaClient.companyRenewal.update({
            where: {
                id: id
            },
            data: {
                date_renewal: new Date(date_renewal),
                observation: observation
            }
        })

        return (renewalRes)

    }
}

export { CheckRenewalService }