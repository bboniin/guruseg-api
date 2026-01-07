import { Request, Response } from "express";
import { EditModuleService } from "../../../services/Admin/Courses/EditModuleService";

class EditModuleController {
  async handle(req: Request, res: Response) {
    const { name, description, restricted, order } = req.body;

    const { id } = req.params;

    let userId = req.userId;

    const editModuleService = new EditModuleService();

    const module = await editModuleService.execute({
      name,
      description,
      order,
      id,
      restricted,
      userId,
    });

    return res.json(module);
  }
}

export { EditModuleController };
