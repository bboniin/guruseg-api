import { Request, Response } from "express";
import { ListCoursesService } from "../../../services/Admin/Courses/ListCoursesService";

class ListCoursesController {
  async handle(req: Request, res: Response) {
    const { search } = req.query;

    let userId = req.userId;

    const listCoursesService = new ListCoursesService();

    const modules = await listCoursesService.execute({
      userId,
      search: search ? String(search) : "",
    });

    modules.map((item) => {
      item.courses.map((data) => {
        if (data["photo"]) {
          data["photo_url"] =
            "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + data["photo"];
        }
      });
    });

    return res.json(modules);
  }
}

export { ListCoursesController };
