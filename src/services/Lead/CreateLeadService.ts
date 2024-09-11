import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
    name: string;
    email: string;
    phone_number: string;
    value: number;
    observation: string;
    employees: string;
    cnpj: string;
    necessity: string;
    location: string;
}

class CreateLeadService {
    async execute({ name, userId, observation, value, email, location, cnpj, necessity, phone_number, employees }: LeadRequest) {

        if (!name || !email || !phone_number) {
            throw new Error("Nome, email e telefone são obrigatórios")
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            userId = null
        }

        const lead = await prismaClient.lead.create({
            data: {
                name: name,
                value: value,
                email: email,
                user_id: userId,
                phone_number: phone_number,
                observation: observation,
                employees: employees,
                necessity: necessity,
                cnpj: cnpj,
                location: location
            }
        })

        return (lead)
    }
}

export { CreateLeadService }