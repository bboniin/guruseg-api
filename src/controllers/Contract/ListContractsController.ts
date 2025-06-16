import { Request, Response } from "express";
import { ListContractsService } from "../../services/Contract/ListContractsService";

class ListContractsController {
  async handle(req: Request, res: Response) {
    const { lead_id, search, status, page } = req.query;

    let userId = req.userId;

    const listContractsService = new ListContractsService();

    const contracts = await listContractsService.execute({
      userId,
      lead_id: lead_id ? String(lead_id) : "",
      search: search ? String(search) : "",
      status: status ? String(status) : "",
      page: Number(page) || 0,
    });

    return res.json(contracts);
  }
}

export { ListContractsController };
