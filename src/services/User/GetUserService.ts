import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface UserRequest {
  userId: string;
}

class GetUserService {
  async execute({ userId }: UserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
        visible: true,
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
        visible: true,
      },
    });

    const attendant = await prismaClient.attendant.findFirst({
      where: {
        id: userId,
        visible: true,
      },
    });

    const associate = await prismaClient.associate.findFirst({
      where: {
        id: userId,
        visible: true,
      },
    });

    if (!user && !collaborator && !admin && !attendant && !associate) {
      throw new Error("Usuário não encontrado");
    }

    const s3Storage = new S3Storage();

    if (user) {
      const photo_url = user.photo
        ? await s3Storage.getTemporaryUrl(user.photo, 245)
        : "";

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        photo: user.photo,
        photo_url: photo_url,
        courses_enabled: user.courses_enabled,
        leads_enabled: user.leads_enabled,
        marketing_enabled: user.marketing_enabled,
        credentials_enabled: user.credentials_enabled,
        costumer_id: user.costumer_id,
        category: user.category,
        phone_number: user.phone_number,
      };
    }
    if (collaborator) {
      const photo_url = collaborator.photo
        ? await s3Storage.getTemporaryUrl(collaborator.photo, 245)
        : "";

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
      const photo_url = admin.photo
        ? await s3Storage.getTemporaryUrl(admin.photo, 245)
        : "";

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
      const photo_url = attendant.photo
        ? await s3Storage.getTemporaryUrl(attendant.photo, 245)
        : "";
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
    if (associate) {
      const photo_url = associate.photo
        ? await s3Storage.getTemporaryUrl(associate.photo, 245)
        : "";
      return {
        id: associate.id,
        email: associate.email,
        name: associate.name,
        photo: associate.photo,
        phone_number: associate.phone_number,
        comission: associate.comission,
        state: associate.state,
        city: associate.city,
        photo_url: photo_url,
        type: associate.type,
        cpf: associate.cpf,
        terms_accepted: associate.terms_accepted,
        type_pix: associate.type_pix,
        key_pix: associate.key_pix,
      };
    }
  }
}

export { GetUserService };
