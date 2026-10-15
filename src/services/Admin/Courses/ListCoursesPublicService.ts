import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  userId: string;
  search: string;
}

class ListCoursesPublicService {
  async execute({ userId, search }: CourseRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let filter = {};

    if (user.courses) {
      const idsArray = user.courses.split(";");

      filter = {
        id: { in: idsArray },
      };
    }

    const modules = await prismaClient.module.findMany({
      where: filter,
      orderBy: {
        order: "asc",
      },
      include: {
        courses: {
          where: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            order: "asc",
          },
          include: {
            lessons: {
              include: {
                confirms: {
                  where: {
                    user_id: userId,
                  },
                },
              },
            },
          },
        },
      },
    });

    const s3Storage = new S3Storage();
    const modulesResponse = await Promise.all(
      modules.map(async (module) => {
        await Promise.all(
          module.courses.map(async (course) => {
            if (course.photo) {
              course["photo_url"] = await s3Storage.getTemporaryUrl(
                course.photo,
                245,
              );
            }
          }),
        );

        return module;
      }),
    );
    return modulesResponse;
  }
}

export { ListCoursesPublicService };
