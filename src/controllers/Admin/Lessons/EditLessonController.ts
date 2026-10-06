import { Request, Response } from "express";
import { EditLessonService } from "../../../services/Admin/Lessons/EditLessonService";

class EditLessonController {
  async handle(req: Request, res: Response) {
    const { name, description, video, file_name, order, delete_file } =
      req.body;

    const { id } = req.params;

    let file = "";

    if (req.file) {
      file = req.file.filename;
    }

    const editLessonService = new EditLessonService();

    const lesson = await editLessonService.execute({
      name,
      description,
      video,
      file_name,
      order,
      file,
      id,
      delete_file,
    });

    return res.json(lesson);
  }
}

export { EditLessonController };
