import { Request, Response } from "express";
import { ListCompaniesConfirmService } from "../../services/Company/ListCompaniesConfirmService";

class ListCompaniesConfirmController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.query;
    let userId = req.userId;

    const listCompaniesConfirmService = new ListCompaniesConfirmService();

    const companies = await listCompaniesConfirmService.execute({
      userId,
      order_id: order_id ? Number(order_id) || 0 : 0,
    });

    return res.json(companies);
  }
}

export { ListCompaniesConfirmController };
