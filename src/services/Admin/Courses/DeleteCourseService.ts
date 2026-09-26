import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  id: string;
}

class DeleteCourseService {
  async execute({ id }: CourseRequest) {
    const course = await prismaClient.course.findFirst({
      where: {
        id: id,
      },
    });

    if (course.photo) {
      const s3Storage = new S3Storage();
      await s3Storage.deleteFile(course["photo"]);
    }

    const courseD = await prismaClient.course.delete({
      where: {
        id: id,
      },
    });

    return courseD;
  }
}

export { DeleteCourseService };
