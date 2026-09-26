import { Request, Response } from "express";
import { ListEnterpriseService } from "../../services/Enterprise/ListEnterpriseService";

class ListEnterpriseController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;
    const { search, type, page, all } = req.query;

    const listEnterpriseService = new ListEnterpriseService();

    const enterprises = await listEnterpriseService.execute({
      userId,
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
      page: page !== undefined ? Number(page) : undefined,
      all: all === "true" || all === "1",
    });

    return res.json(enterprises);
  }
}

export { ListEnterpriseController };
