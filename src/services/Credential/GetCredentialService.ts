import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface CredentialRequest {
  id: string;
}

class GetCredentialService {
  async execute({ id }: CredentialRequest) {
    const credential = await prismaClient.credential.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        name: true,
        phone_number: true,
        state: true,
        city: true,
        services: true,
        served_cities: true,
        profession: true,
        birthday: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true,
      },
    });

    if (!credential) {
      throw new Error("Credenciado não foi encontrado");
    }

    const s3Storage = new S3Storage();
    if (credential.photo) {
      credential["photo_url"] = await s3Storage.getTemporaryUrl(
        credential.photo,
        245,
      );
    }
    return credential;
  }
}

export { GetCredentialService };
