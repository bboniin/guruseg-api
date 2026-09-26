import { Request, Response } from "express";
import { DeleteModuleService } from "../../../services/Admin/Courses/DeleteModuleService";

class DeleteModuleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteModuleService = new DeleteModuleService();

    const module = await deleteModuleService.execute({
      id,
    });

    return res.json(module);
  }
}

export { DeleteModuleController };
