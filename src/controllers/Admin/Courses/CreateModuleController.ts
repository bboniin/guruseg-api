import { Request, Response } from "express";
import { CreateModuleService } from "../../../services/Admin/Courses/CreateModuleService";

class CreateModuleController {
  async handle(req: Request, res: Response) {
    const { name, description, restricted, order } = req.body;

    const createModuleService = new CreateModuleService();

    const module = await createModuleService.execute({
      name,
      order,
      description,
      restricted,
    });

    return res.json(module);
  }
}

export { CreateModuleController };
