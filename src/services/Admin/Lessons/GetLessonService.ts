import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface LessonRequest {
  id: string;
}

class GetLessonService {
  async execute({ id }: LessonRequest) {
    const lesson = await prismaClient.lesson.findUnique({
      where: {
        id: id,
      },
    });

    const s3Storage = new S3Storage();
    if (lesson.file) {
      lesson["file_url"] = await s3Storage.getTemporaryUrl(lesson.file, 245);
    }

    return lesson;
  }
}

export { GetLessonService };
