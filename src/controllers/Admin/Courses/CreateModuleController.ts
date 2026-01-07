import { Request, Response } from "express";
import { CreateModuleService } from "../../../services/Admin/Courses/CreateModuleService";

class CreateModuleController {
  async handle(req: Request, res: Response) {
    const { name, description, restricted, order } = req.body;

    let userId = req.userId;

    const createModuleService = new CreateModuleService();

    const module = await createModuleService.execute({
      userId,
      name,
      order,
      description,
      restricted,
    });

    return res.json(module);
  }
}

export { CreateModuleController };
