import prismaClient from '../../prisma';

class InactiveLeadsService {
    async execute() {

      const oneDayAgo = new Date();

      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      let leads = await prismaClient.lead.findMany({
        where: {
          status: "Oportunidade",
          update_at: {
              lt: oneDayAgo,
          },
          leadMaster: {
            is: {
              is_user: false,
            },
          }
        },
      });
    }
}

export { InactiveLeadsService }