import { Request, Response } from "express";
import { DeletePackageService } from "../../services/Deposit/DeletePackageService";

class DeletePackageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deletePackageService = new DeletePackageService();

    const packageRes = await deletePackageService.execute({
      id,
      userId,
    });

    return res.json(packageRes);
  }
}

export { DeletePackageController };
