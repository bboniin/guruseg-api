import { Request, Response } from "express";
import { ConfirmLessonService } from "../../../services/Admin/Lessons/ConfirmLessonService";

class ConfirmLessonController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const confirmLessonService = new ConfirmLessonService();

    const lesson = await confirmLessonService.execute({
      userId,
      lessonId: id,
    });

    return res.json(lesson);
  }
}

export { ConfirmLessonController };
