import prismaClient from '../../prisma'

interface LeadRequest {
    name: string;
    email: string;
    phone_number: string;
    value: number;
    observation: string;
    employees: string;
    cnpj: string;
    necessity: string;
    location: string;
    send: string;
}

class CreateLeadWebService {
    async execute({ name, observation, send, value, email, location, cnpj, necessity, phone_number, employees }: LeadRequest) {

        if (!name || !email || !phone_number) {
            throw new Error("Nome, email e telefone são obrigatórios")
        }

        const lead = await prismaClient.lead.create({
            data: {
                name: name,
                value: value,
                email: email,
                phone_number: phone_number,
                observation: observation,
                employees: employees,
                necessity: necessity,
                cnpj: cnpj,
                send: send,
                user_id: null,
                location: location
            }
        })

        return (lead)
    }
}

export { CreateLeadWebService }