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
        course: true,
        resale: true,
        signature: true,
        modules: true,
        sector1_id: true,
        sector2_id: true,
        sector3_id: true,
        sector4_id: true,
        sector5_id: true,
        services: true,
        phone_number: true,
        category: true,
        enable_payment: true,
        city: true,
        state: true,
        photo: true,
      },
    });

    if (!user) {
      throw new Error("Franqueado não foi encontrado.");
    }

    return user;
  }
}

export { GetUserAdminService };
