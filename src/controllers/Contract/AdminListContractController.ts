import { Request, Response } from "express";
import { AdminListContractsService } from "../../services/Contract/AdminListContractsService";

class AdminListContractsController {
  async handle(req: Request, res: Response) {
    const { user_id, search, page } = req.params;

    const adminListContractsService = new AdminListContractsService();

    const orders = await adminListContractsService.execute({
      user_id,
      search: search ? String(search) : "",
      page: Number(page) || 0,
    });

    return res.json(orders);
  }
}

export { AdminListContractsController };
