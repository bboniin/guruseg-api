import { Request, Response } from "express";
import { ListLeadMatrizService } from "../../services/LeadMatriz/ListLeadMatrizService";

class ListLeadMatrizController {
  async handle(req: Request, res: Response) {
    const { user_id, search, status, page, all } = req.query;

    const listLeadMatrizService = new ListLeadMatrizService();

    const leads = await listLeadMatrizService.execute({
      user_id: user_id ? String(user_id) : undefined,
      search: search ? String(search) : undefined,
      status: status ? String(status) : undefined,
      page: page ? Number(page) || 0 : 0,
      all: all === "true",
    });

    return res.json(leads);
  }
}

export { ListLeadMatrizController };
