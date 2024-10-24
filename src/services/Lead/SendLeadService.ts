import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
    leads: Array<string>;
}

class SendLeadService {
    async execute({ leads, userId }: LeadRequest) {

        if (!userId || !leads.length) {
            throw new Error("Id do Franqueado e pelo menos um lead são obrigatórios")
        }

        const user = await prismaClient.user.findUnique({
          where: {
              id: userId
          }
        })
        
        if (!user) {
            throw new Error("Franqueado não foi encontrado")
        }

        await Promise.all(
          leads.map( async item => {
              const leadMaster = await prismaClient.leadMaster.findUnique({
                where: {
                    id: item
                }
              })

              if(leadMaster){
                return prismaClient.lead.create({
                  data: {
                    name: leadMaster.name,
                    value: leadMaster.value,
                    tag: leadMaster.tag,
                    necessity: leadMaster.necessity,
                    phone_number: leadMaster.phone_number,
                    email: leadMaster.email,
                    cnpj: leadMaster.cnpj,
                    employees: leadMaster.employees,
                    location: leadMaster.location,
                    user_id: userId,
                    lead_id: leadMaster.id,
                    observation: leadMaster.observation
                  }
                });  
              }
            })
          );

        return ("Leads enviado com sucesso")
    }
}

export { SendLeadService }