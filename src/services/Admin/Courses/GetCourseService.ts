import prismaClient from "../../../prisma";

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

    return course;
  }
}

export { GetCourseService };
