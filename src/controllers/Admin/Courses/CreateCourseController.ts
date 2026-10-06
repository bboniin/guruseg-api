import { Request, Response } from "express";
import { CreateCourseService } from "../../../services/Admin/Courses/CreateCourseService";

class CreateCourseController {
  async handle(req: Request, res: Response) {
    const { name, description, order, restricted, module_id } = req.body;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const createCourseService = new CreateCourseService();

    const course = await createCourseService.execute({
      name,
      order,
      description,
      photo,
      module_id,
    });

    return res.json(course);
  }
}

export { CreateCourseController };
