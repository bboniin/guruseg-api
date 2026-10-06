import { Request, Response } from "express";
import { ListAdminsService } from "../../../services/Admin/Admins/ListAdminsService";

class ListAdminsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page } = req.query;

    const listadminsService = new ListAdminsService();

    const admins = await listadminsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
    });

    return res.json(admins);
  }
}

export { ListAdminsController };
