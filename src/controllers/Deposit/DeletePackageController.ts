import { Request, Response } from "express";
import { DeletePackageService } from "../../services/Deposit/DeletePackageService";

class DeletePackageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deletePackageService = new DeletePackageService();

    const packageRes = await deletePackageService.execute({
      id,
    });

    return res.json(packageRes);
  }
}

export { DeletePackageController };
