import prismaClient from "../../../prisma";

interface CourseRequest {
  search: string;
}

class ListCoursesService {
  async execute({ search }: CourseRequest) {
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

    const courses = await prismaClient.course.findMany({
      where: {
        module_id: null,

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
    });

    if (courses.length) {
      modules.unshift({
        name: "Sem Modulo",
        id: "",
        description: "",
        order: 0,
        create_at: new Date(),
        update_at: new Date(),
        restricted: false,
        courses: courses,
      });
    }

    return modules;
  }
}

export { ListCoursesService };
