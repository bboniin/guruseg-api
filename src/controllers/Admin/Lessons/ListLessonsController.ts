import { Request, Response } from "express";
import { ListLessonsService } from "../../../services/Admin/Lessons/ListLessonsService";

class ListLessonsController {
  async handle(req: Request, res: Response) {
    const { course_id } = req.params;

    const listLessonsService = new ListLessonsService();

    const lessons = await listLessonsService.execute({
      course_id,
    });

    return res.json(lessons);
  }
}

export { ListLessonsController };
