import { Request, Response } from "express";
import { DeleteLessonService } from "../../../services/Admin/Lessons/DeleteLessonService";

class DeleteLessonController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteLessonService = new DeleteLessonService();

    const lesson = await deleteLessonService.execute({
      id,
    });

    return res.json(lesson);
  }
}

export { DeleteLessonController };
