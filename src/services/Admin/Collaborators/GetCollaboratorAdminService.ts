import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface ServiceRequest {
  id: string;
}

class GetCollaboratorAdminService {
  async execute({ id }: ServiceRequest) {
    const collaborator = await prismaClient.collaborator.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        sector: true,
        photo: true,
      },
    });

    if (!collaborator) {
      throw new Error("Técnico não foi encontrado.");
    }
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

export { GetCollaboratorAdminService };
