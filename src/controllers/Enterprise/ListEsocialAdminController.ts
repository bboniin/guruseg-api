import { Request, Response } from "express";
import { ListEsocialAdminService } from "../../services/Enterprise/ListEsocialAdminService";

class ListEsocialAdminController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.query;

    const listEsocialAdminService = new ListEsocialAdminService();

    const enterprises = await listEsocialAdminService.execute({
      userId: user_id ? String(user_id) : undefined,
    });

    return res.json(enterprises);
  }
}

export { ListEsocialAdminController };
