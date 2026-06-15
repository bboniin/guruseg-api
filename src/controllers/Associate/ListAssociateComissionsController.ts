import { Request, Response } from "express";
import { ListAssociateComissionsService } from "../../services/Associate/ListAssociateComissionsService";

class ListAssociateComissionsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const userId = req.userId;

    const listAssociateComissionsService = new ListAssociateComissionsService();

    const comissions = await listAssociateComissionsService.execute({
      userId,
      page: Number(page) || 0,
    });

    return res.json(comissions);
  }
}

export { ListAssociateComissionsController };
