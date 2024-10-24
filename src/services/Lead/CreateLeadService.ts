import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
    name: string;
    email: string;
    phone_number: string;
    observation: string;
    employees: string;
    cnpj: string;
    necessity: string;
    location: string;
}

class CreateLeadService {
    async execute({ name, userId, observation, email, location, cnpj, necessity, phone_number, employees }: LeadRequest) {

        if (!name) {
            throw new Error("Nome é obrigatório")
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            userId = null
        }
        
        if(email){
            const leadMaster = await prismaClient.leadMaster.findFirst({
                where: {
                    email: email
                }
            })

            if(leadMaster){
                throw new Error("Email já está em uso")
            }
        }

        const leadMaster = await prismaClient.leadMaster.create({
            data: {
                name: name,
                value: 0,
                email: email,
                phone_number: phone_number,
                observation: observation,
                employees: employees,
                necessity: necessity,
                cnpj: cnpj,
                is_user: !!userId,
                location: location
            }
        })

        const lead = await prismaClient.lead.create({
            data: {
                name: name,
                value: 0,
                email: email,
                user_id: userId,
                phone_number: phone_number,
                observation: observation,
                employees: employees,
                necessity: necessity,
                cnpj: cnpj,
                location: location,
                lead_id: leadMaster.id
            }
        })

        return (lead)
    }
}

export { CreateLeadService }