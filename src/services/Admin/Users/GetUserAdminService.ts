import prismaClient from "../../../prisma";

interface ServiceRequest {
  id: string;
}

class GetUserAdminService {
  async execute({ id }: ServiceRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        modules: true,
        sector1_id: true,
        sector2_id: true,
        sector3_id: true,
        sector4_id: true,
        sector5_id: true,
        services: true,
        phone_number: true,
        costumer_id: true,
        category: true,
        city: true,
        state: true,
        photo: true,
        courses: true,
        leads_enabled: true,
        courses_enabled: true,
        marketing_enabled: true,
        credentials_enabled: true,
        value_pcmso: true,
        value_ltcat_atr: true,
        value_ltcat_medico: true,
        value_pgr_atr: true,
        value_lip: true,
        value_li: true,
        value_lp: true,
      },
    });

    if (!user) {
      throw new Error("Franqueado não foi encontrado.");
    }

    return user;
  }
}

export { GetUserAdminService };
