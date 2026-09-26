import { Request, Response } from "express";
import { GetLessonService } from "../../../services/Admin/Lessons/GetLessonService";

class GetLessonController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getLessonService = new GetLessonService();

    const lesson = await getLessonService.execute({
      id,
    });

    if (lesson["file"]) {
      lesson["file_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + lesson["file"];
    }

    return res.json(lesson);
  }
}

export { GetLessonController };
