import { Request, Response } from "express";
import { GetCoursePublicService } from "../../../services/Admin/Courses/GetCoursePublicService";

class GetCoursePublicController {
  async handle(req: Request, res: Response) {
    const { course_id } = req.params;

    let userId = req.userId;

    const getCoursePublicService = new GetCoursePublicService();

    const course = await getCoursePublicService.execute({
      userId,
      course_id,
    });

    return res.json(course);
  }
}

export { GetCoursePublicController };
