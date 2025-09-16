import { Request, Response } from "express";
import { ListDepositsAdminService } from "../../services/Deposit/ListDepositsAdminService";

class ListDepositsAdminController {
  async handle(req: Request, res: Response) {
    const { page, collaborator_id, startDate, endDate, status } = req.query;

    let userId = req.userId;

    const listDepositsAdminService = new ListDepositsAdminService();

    const deposits = await listDepositsAdminService.execute({
      userId,
      page: Number(page) || 0,
      collaborator_id: String(collaborator_id || ""),
      endDate: endDate ? String(endDate) : "",
      status: status ? String(status) : "",
      startDate: startDate ? String(startDate) : "",
    });

    return res.json(deposits);
  }
}

export { ListDepositsAdminController };
