import prismaClient from "../../../prisma";

interface CourseRequest {
  userId: string;
  search: string;
}

class ListCoursesPublicService {
  async execute({ userId, search }: CourseRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let filter = {};

    if (user.courses) {
      const idsArray = user.courses.split(";");

      filter = {
        id: { in: idsArray },
      };
    }

    const modules = await prismaClient.module.findMany({
      where: filter,
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
                confirms: {
                  where: {
                    user_id: userId,
                  },
                },
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
