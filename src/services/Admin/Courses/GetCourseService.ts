import prismaClient from "../../../prisma";

interface CourseRequest {
  userId: string;
  course_id: string;
}

class GetCourseService {
  async execute({ userId, course_id }: CourseRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

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

    return course;
  }
}

export { GetCourseService };
