import { Request, Response } from "express";
import { CreatePackageService } from "../../services/Deposit/CreatePackageService";

class CreatePackageController {
  async handle(req: Request, res: Response) {
    const { name, value, description, bonus, type } = req.body;

    let userId = req.userId;

    const createPackageService = new CreatePackageService();

    const packageRes = await createPackageService.execute({
      name,
      value,
      bonus,
      description,
      userId,
      type,
    });

    return res.json(packageRes);
  }
}

export { CreatePackageController };
