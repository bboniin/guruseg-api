import prismaClient from "../../../prisma";

interface AttendantRequest {
  id: string;
}

class GetAttendantAdminService {
  async execute({ id }: AttendantRequest) {
    const attendant = await prismaClient.attendant.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        type: true,
      },
    });

    if (!attendant) {
      throw new Error("Técnico não foi encontrado.");
    }

    return attendant;
  }
}

export { GetAttendantAdminService };
