import { Request, Response } from "express";
import { GetCourseService } from "../../../services/Admin/Courses/GetCourseService";

class GetCourseController {
  async handle(req: Request, res: Response) {
    const { course_id } = req.params;

    const getCourseService = new GetCourseService();

    const course = await getCourseService.execute({
      course_id,
    });

    return res.json(course);
  }
}

export { GetCourseController };
