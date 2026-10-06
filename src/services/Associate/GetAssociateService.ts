import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface AssociateRequest {
  userId: string;
}

class GetAssociateService {
  async execute({ userId }: AssociateRequest) {
    const associate = await prismaClient.associate.findUnique({
      where: {
        id: userId,
      },
    });

    const s3Storage = new S3Storage();
    if (associate.photo) {
      associate["photo_url"] = await s3Storage.getTemporaryUrl(
        associate.photo,
        245,
      );
    }
    return associate;
  }
}

export { GetAssociateService };
