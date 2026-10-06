import { Request, Response } from "express";
import { ListCoursesService } from "../../../services/Admin/Courses/ListCoursesService";

class ListCoursesController {
  async handle(req: Request, res: Response) {
    const { search } = req.query;

    const listCoursesService = new ListCoursesService();

    const modules = await listCoursesService.execute({
      search: search ? String(search) : "",
    });

    return res.json(modules);
  }
}

export { ListCoursesController };
