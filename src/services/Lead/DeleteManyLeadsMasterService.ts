import prismaClient from "../../prisma";

class DeleteManyLeadsMasterService {
  async execute() {
    const lead = await prismaClient.leadMaster.deleteMany({
      where: {
        leads: {
          none: {},
        },
      },
    });
    return lead;
  }
}

export { DeleteManyLeadsMasterService };
