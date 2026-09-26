import { Request, Response } from "express";
import { EditModuleService } from "../../../services/Admin/Courses/EditModuleService";

class EditModuleController {
  async handle(req: Request, res: Response) {
    const { name, description, restricted, order } = req.body;

    const { id } = req.params;

    const editModuleService = new EditModuleService();

    const module = await editModuleService.execute({
      name,
      description,
      order,
      id,
      restricted,
    });

    return res.json(module);
  }
}

export { EditModuleController };
