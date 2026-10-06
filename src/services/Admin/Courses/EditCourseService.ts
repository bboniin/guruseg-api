import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  name: string;
  photo: string;
  description: string;
  id: string;
  module_id: string;
  order: string;
}

class EditCourseService {
  async execute({
    name,
    description,
    module_id,
    order,
    photo,
    id,
  }: CourseRequest) {
    const course = await prismaClient.course.findUnique({
      where: {
        id: id,
      },
    });

    if (!name) {
      throw new Error("Nome do curso é obrigatório");
    }

    if (!course) {
      throw new Error("course não existe");
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    let data = {
      name: name,
      module_id: module_id,
      description: description,
      order: orderC,
    };

    if (photo) {
      const s3Storage = new S3Storage();

      if (course["photo"]) {
        await s3Storage.deleteFile(course["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const courseRes = await prismaClient.course.update({
      where: {
        id: id,
      },
      data: data,
    });

    const s3Storage = new S3Storage();
    if (courseRes.photo) {
      courseRes["photo_url"] = await s3Storage.getTemporaryUrl(
        courseRes.photo,
        245,
      );
    }
    return courseRes;
  }
}

export { EditCourseService };
