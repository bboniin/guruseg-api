import { Request, Response } from "express";
import { ListDepositsService } from "../../services/Deposit/ListDepositsService";

class ListDepositsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    let userId = req.userId;

    const listDepositsService = new ListDepositsService();

    const deposits = await listDepositsService.execute({
      userId,
      page: Number(page) || 0,
    });

    return res.json(deposits);
  }
}

export { ListDepositsController };
