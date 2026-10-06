import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface LessonRequest {
  course_id: string;
}

class ListLessonsService {
  async execute({ course_id }: LessonRequest) {
    const lessons = await prismaClient.lesson.findMany({
      where: {
        course_id: course_id,
      },
      orderBy: {
        order: "asc",
      },
      include: {
        confirms: true,
      },
    });

    const s3Storage = new S3Storage();
    const lessonsResponse = await Promise.all(
      lessons.map(async (lesson) => {
        if (lesson.file) {
          lesson["file_url"] = await s3Storage.getTemporaryUrl(
            lesson.file,
            245,
          );
        }

        return lesson;
      }),
    );
    return lessonsResponse;
  }
}

export { ListLessonsService };
