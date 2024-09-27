import prismaClient from '../../prisma'

interface LeadRequest {
    leadId: string;
    users: Array<string>;
}

class SendLeadService {
    async execute({ leadId, users }: LeadRequest) {

        if (!leadId || !users.length) {
            throw new Error("Franqueadose Id do lead são obrigatórios")
        }

        const leadMaster = await prismaClient.leadMaster.findUnique({
          where: {
              id: leadId
          }
        })
        
        if (!leadMaster) {
            throw new Error("Lead não foi encontrado")
        }

        await Promise.all(
            users.map(item => {
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
                  user_id: item,
                  lead_id: leadMaster.id,
                  observation: leadMaster.observation
                }
              });
            })
          );

        return ("Lead enviado com sucesso")
    }
}

export { SendLeadService }