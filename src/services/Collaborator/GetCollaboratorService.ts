import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface CollaboratorRequest {
  userId: string;
}

class GetCollaboratorService {
  async execute({ userId }: CollaboratorRequest) {
    const collaborator = await prismaClient.collaborator.findUnique({
      where: {
        id: userId,
      },
    });

    const s3Storage = new S3Storage();
    if (collaborator.photo) {
      collaborator["photo_url"] = await s3Storage.getTemporaryUrl(
        collaborator.photo,
        245,
      );
    }
    return collaborator;
  }
}

export { GetCollaboratorService };
