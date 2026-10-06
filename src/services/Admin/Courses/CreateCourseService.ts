import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface CourseRequest {
  name: string;
  photo: string;
  order: string;
  module_id: string;
  description: string;
}

class CreateCourseService {
  async execute({ name, photo, order, module_id, description }: CourseRequest) {
    if (!name) {
      throw new Error("Nome do curso é obrigatório");
    }

    if (photo) {
      const s3Storage = new S3Storage();
      await s3Storage.saveFile(photo);
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    const courseRes = await prismaClient.course.create({
      data: {
        name: name,
        description: description,
        photo: photo,
        module_id: module_id,
        order: orderC,
      },
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

export { CreateCourseService };
