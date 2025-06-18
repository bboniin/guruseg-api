import prismaClient from "../../../prisma";

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

    return course;
  }
}

export { GetCoursePublicService };
