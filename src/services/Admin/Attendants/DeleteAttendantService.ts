import prismaClient from "../../../prisma";

interface AttendantRequest {
  id: string;
}

class DeleteAttendantService {
  async execute({ id }: AttendantRequest) {
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
