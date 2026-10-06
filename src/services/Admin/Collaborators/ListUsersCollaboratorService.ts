import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface ServiceRequest {
  userId: string;
  collaborator_id: string;
}

class ListUsersCollaboratorService {
  async execute({ userId, collaborator_id }: ServiceRequest) {
    const users = await prismaClient.user.findMany({
      where: {
        OR: [
          {
            sector1_id: collaborator_id,
          },
          {
            sector2_id: collaborator_id,
          },
          {
            sector3_id: collaborator_id,
          },
          {
            sector4_id: collaborator_id,
          },
          {
            sector5_id: collaborator_id,
          },
        ],
        visible: true,
      },
      orderBy: {
        create_at: "asc",
      },
    });

    const s3Storage = new S3Storage();
    const usersResponse = await Promise.all(
      users.map(async (user) => {
        if (user.photo) {
          user["photo_url"] = await s3Storage.getTemporaryUrl(user.photo, 245);
        }

        return user;
      }),
    );

    return usersResponse;
  }
}

export { ListUsersCollaboratorService };
