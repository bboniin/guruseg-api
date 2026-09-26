import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface LessonRequest {
  id: string;
}

class DeleteLessonService {
  async execute({ id }: LessonRequest) {
    const lesson = await prismaClient.lesson.findFirst({
      where: {
        id: id,
      },
    });

    if (lesson.file) {
      const s3Storage = new S3Storage();
      await s3Storage.deleteFile(lesson["file"]);
    }

    const lessonD = await prismaClient.lesson.delete({
      where: {
        id: id,
      },
    });

    return lessonD;
  }
}

export { DeleteLessonService };
