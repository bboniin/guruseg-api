import { Request, Response } from "express";
import { ListLeadsBuyService } from "../../services/Lead/ListLeadsBuyService";

class ListLeadsBuyController {
  async handle(req: Request, res: Response) {
    const { page, location } = req.query;

    const listLeadsBuyService = new ListLeadsBuyService();

    const userId = req.userId;

    const leads = await listLeadsBuyService.execute({
      page: Number(page) || 0,
      userId: userId ? String(userId) : "",
      location: location ? String(location) : "",
    });

    return res.json(leads);
  }
}

export { ListLeadsBuyController };
