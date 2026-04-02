import { Request, Response } from "express";
import { DeleteAssociateService } from "../../../services/Admin/Associates/DeleteAssociateService";

class DeleteAssociateController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAssociateService = new DeleteAssociateService();

    const associate = await deleteAssociateService.execute({
      id,
    });

    return res.json(associate);
  }
}

export { DeleteAssociateController };
