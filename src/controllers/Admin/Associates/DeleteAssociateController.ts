import { Request, Response } from "express";
import { DeleteAssociateService } from "../../../services/Admin/Associates/DeleteAssociateService";

class DeleteAssociateController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deleteAssociateService = new DeleteAssociateService();

    const associate = await deleteAssociateService.execute({
      id,
      userId,
    });

    return res.json(associate);
  }
}

export { DeleteAssociateController };
