import { Request, Response } from "express";
import { GetAdminAssociateService } from "../../../services/Admin/Associates/GetAdminAssociateService";

class GetAdminAssociateController {
  async handle(req: Request, res: Response) {
    let { id } = req.params;

    const getAdminAssociateService = new GetAdminAssociateService();

    const associate = await getAdminAssociateService.execute({
      id,
    });

    return res.json(associate);
  }
}

export { GetAdminAssociateController };
