import prismaClient from "../../../prisma";

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

    return lesson;
  }
}

export { GetLessonService };
