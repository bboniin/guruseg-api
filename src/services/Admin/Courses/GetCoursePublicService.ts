import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  userId: string;
  course_id: string;
}

class GetCoursePublicService {
  async execute({ userId, course_id }: CourseRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const course = await prismaClient.course.findUnique({
      where: {
        id: course_id,
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
        module: true,
      },
    });

    if (user.modules) {
      if (!course.module.restricted) {
        throw new Error("Você não tem acesso a esse curso");
      }
    }

    const s3Storage = new S3Storage();
    const courseResponse = await Promise.all(
      course.lessons.map(async (lesson) => {
        if (lesson.file) {
          lesson["file_url"] = await s3Storage.getTemporaryUrl(
            lesson.file,
            245,
          );
        }

        return lesson;
      }),
    );
    return courseResponse;
  }
}

export { GetCoursePublicService };
