import prismaClient from "../../prisma";

interface LeadRequest {
  id: string;
}

class GetLeadMasterService {
  async execute({ id }: LeadRequest) {
    const lead = await prismaClient.lead.findFirst({
      where: {
        lead_id: id,
      },
    });

    return lead;
  }
}

export { GetLeadMasterService };
