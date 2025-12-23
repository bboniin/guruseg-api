import prismaClient from "../../prisma";

interface UserRequest {
  userId: string;
}

class GetUserService {
  async execute({ userId }: UserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    const admin = await prismaClient.admin.findFirst({
      where: {
        id: userId,
      },
    });

    const collaborator = await prismaClient.collaborator.findFirst({
      where: {
        id: userId,
      },
    });

    const attendant = await prismaClient.attendant.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user && !collaborator && !admin && !attendant) {
      throw new Error("Usuário não encontrado");
    }

    if (user) {
      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user.photo;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        photo: user.photo,
        photo_url: photo_url,
        course: user.course,
        resale: user.resale,
        signature: user.signature,
        costumer_id: user.costumer_id,
        phone_number: user.phone_number,
      };
    }
    if (collaborator) {
      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator.photo;

      return {
        id: collaborator.id,
        name: collaborator.name,
        email: collaborator.email,
        type: collaborator.type,
        photo: collaborator.photo,
        photo_url: photo_url,
        phone_number: collaborator.phone_number,
      };
    }
    if (admin) {
      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + admin.photo;

      return {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        photo: admin.photo,
        photo_url: photo_url,
        access_granted: admin.access_granted,
        type: admin.type,
      };
    }
    if (attendant) {
      let photo_url =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + attendant.photo;
      return {
        id: attendant.id,
        email: attendant.email,
        name: attendant.name,
        photo: attendant.photo,
        enabled: attendant.enabled,
        photo_url: photo_url,
        type: attendant.type,
      };
    }
  }
}

export { GetUserService };
