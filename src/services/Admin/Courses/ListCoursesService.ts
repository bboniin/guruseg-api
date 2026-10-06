import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

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

    const s3Storage = new S3Storage();
    const modulesResponse = await Promise.all(
      modules.map(async (module) => {
        await Promise.all(
          module.courses.map(async (course) => {
            if (course.photo) {
              course["photo_url"] = await s3Storage.getTemporaryUrl(
                course.photo,
                245,
              );
            }
          }),
        );

        return module;
      }),
    );
    return modulesResponse;
  }
}

export { ListCoursesService };
