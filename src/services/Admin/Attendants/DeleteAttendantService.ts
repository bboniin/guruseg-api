import prismaClient from "../../../prisma";

interface AttendantRequest {
  id: string;
  userId: string;
}

class DeleteAttendantService {
  async execute({ id, userId }: AttendantRequest) {
    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const attendant = await prismaClient.attendant.update({
      where: {
        id: id,
      },
      data: {
        visible: false,
        email: id,
      },
    });

    return attendant;
  }
}

export { DeleteAttendantService };
