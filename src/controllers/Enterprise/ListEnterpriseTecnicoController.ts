import { Request, Response } from "express";
import { ListEnterpriseTecnicoService } from "../../services/Enterprise/ListEnterpriseTecnicoService";

class ListEnterpriseTecnicoController {
  async handle(req: Request, res: Response) {
    const { user_id, search, type, page, all } = req.query;

    const userId = req.userId;

    const listEnterpriseTecnicoService = new ListEnterpriseTecnicoService();

    const enterprises = await listEnterpriseTecnicoService.execute({
      userId,
      user_id: user_id ? String(user_id) : undefined,
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
      page: page !== undefined ? Number(page) : undefined,
      all: all === "true" || all === "1",
    });

    return res.json(enterprises);
  }
}

export { ListEnterpriseTecnicoController };
