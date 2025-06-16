import prismaClient from "../../../prisma";

interface CourseRequest {
  userId: string;
  search: string;
}

class ListCoursesPublicService {
  async execute({ userId, search }: CourseRequest) {
    const modules = await prismaClient.module.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        courses: {
          where: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            order: "asc",
          },
          include: {
            lessons: {
              include: {
                confirms: true,
              },
            },
          },
        },
      },
    });

    return modules;
  }
}

export { ListCoursesPublicService };
