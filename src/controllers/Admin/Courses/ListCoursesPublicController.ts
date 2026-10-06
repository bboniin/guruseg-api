import { Request, Response } from "express";
import { ListCoursesPublicService } from "../../../services/Admin/Courses/ListCoursesPublicService";

class ListCoursesPublicController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { search } = req.query;
    const listCoursesPublicService = new ListCoursesPublicService();

    const modules = await listCoursesPublicService.execute({
      userId,
      search: search ? String(search) : "",
    });

    return res.json(modules);
  }
}

export { ListCoursesPublicController };
