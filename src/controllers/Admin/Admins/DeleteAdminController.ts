import { Request, Response } from "express";
import { DeleteAdminService } from "../../../services/Admin/Admins/DeleteAdminService";

class DeleteAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deleteAdminService = new DeleteAdminService();

    const admin = await deleteAdminService.execute({
      id,
      userId,
    });

    return res.json(admin);
  }
}

export { DeleteAdminController };
