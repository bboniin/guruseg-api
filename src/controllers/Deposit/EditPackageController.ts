import { Request, Response } from "express";
import { EditPackageService } from "../../services/Deposit/EditPackageService";

class EditPackageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { name, value, description, bonus, type } = req.body;

    let userId = req.userId;

    const editPackageService = new EditPackageService();

    const packageRes = await editPackageService.execute({
      name,
      value,
      description,
      bonus,
      userId,
      id,
      type,
    });

    return res.json(packageRes);
  }
}

export { EditPackageController };
