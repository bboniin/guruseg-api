import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
    leads: Array<string>;
}

class SendLeadsService {
    async execute({ leads, userId }: LeadRequest) {

        if (!userId || !leads.length) {
            throw new Error("Franqueado e leads são obrigatórios")
        }

        await Promise.all(
            leads.map(item => {
              return prismaClient.lead.update({
                where: {
                  id: item
                },
                data: {
                  user_id: userId
                }
              });
            })
          );

        return ("Leads enviados com sucesso")
    }
}

export { SendLeadsService }