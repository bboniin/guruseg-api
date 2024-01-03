import prismaClient from '../../prisma'
import { addYears, isAfter } from 'date-fns';

interface RenewalRequest {
    fantasia: string;
    razao_social: string;
    type: string;
    cnpj: string;
    cpf: string;
    region: string;
    phone_number: string;
    whatsapp: string;
    observation: string;
    date_init: Date;
    date_renewal: Date;
}

class CreateRenewalService {
    async execute({ fantasia, region, observation, date_renewal, date_init, type, cnpj, cpf, phone_number, razao_social }: RenewalRequest) {

        if ( !razao_social || !date_init || !type || (!cpf && !cnpj) || !region || !date_init) {
            throw new Error("Preencha todos os campos")
        }

        cnpj = cnpj.replace(/[^0-9]/g,'')
        cpf = cpf.replace(/[^0-9]/g,'')

        let company = await prismaClient.companyRenewal.findFirst({
            where:
                type == "PF" ? {
                    cpf: cpf
                } : {
                    cnpj: cnpj
                }
            }
        )
    
        if (company) {
            throw new Error("CNPJ/CPF já está cadastrado")
        }

        if (!date_renewal) {
            date_renewal = new Date(date_init)
                while (isAfter(new Date(), new Date(date_renewal))) {
                    date_renewal = addYears(new Date(date_renewal), 1)
                }
        }

        const renewalRes = await prismaClient.companyRenewal.create({
            data: {
                fantasia: fantasia,
                razao_social: razao_social,
                type: type,
                cnpj: cnpj,
                date_renewal: date_renewal,
                cpf: cpf,
                region: region,
                observation: observation,
                date_init: new Date(date_init),
                phone_number: phone_number,
            }
        })

        return (renewalRes)

    }
}

export { CreateRenewalService }