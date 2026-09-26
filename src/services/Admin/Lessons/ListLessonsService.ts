import prismaClient from "../../../prisma";

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

    return lessons;
  }
}

export { ListLessonsService };
