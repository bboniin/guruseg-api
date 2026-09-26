import { Request, Response } from "express";
import { DeleteEnterpriseAdminService } from "../../services/Enterprise/DeleteEnterpriseAdminService";

class DeleteEnterpriseAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteEnterpriseAdminService = new DeleteEnterpriseAdminService();

    const enterprise = await deleteEnterpriseAdminService.execute({
      id: id,
    });

    return res.json(enterprise);
  }
}

export { DeleteEnterpriseAdminController };
