import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  course_id: string;
}

class GetCourseService {
  async execute({ course_id }: CourseRequest) {
    const course = await prismaClient.course.findUnique({
      where: {
        id: course_id,
      },
      include: {
        lessons: {
          include: {
            confirms: true,
          },
        },
      },
    });

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

export { GetCourseService };
