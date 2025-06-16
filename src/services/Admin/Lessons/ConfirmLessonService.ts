import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  userId: string;
  lessonId: string;
}

class ConfirmLessonService {
  async execute({ userId, lessonId }: CourseRequest) {
    const lessonConfirm = await prismaClient.lessonConfirm.findUnique({
      where: {
        user_id_lesson_id: {
          user_id: userId,
          lesson_id: lessonId,
        },
      },
    });

    if (lessonConfirm) {
      throw new Error("Aula já foi confirmada");
    }

    const confirm = await prismaClient.lessonConfirm.create({
      data: {
        user_id: userId,
        lesson_id: lessonId,
      },
    });

    return confirm;
  }
}

export { ConfirmLessonService };
