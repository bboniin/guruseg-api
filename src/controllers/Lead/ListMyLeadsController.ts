import { Request, Response } from "express";
import { ListMyLeadsService } from "../../services/Lead/ListMyLeadsService";

class ListMyLeadsController {
  async handle(req: Request, res: Response) {
    const { page, dateStart, dateEnd, all, status } = req.query;

    const userId = req.userId;

    const listMyLeadsService = new ListMyLeadsService();

    const leads = await listMyLeadsService.execute({
      page: Number(page) || 0,
      userId: userId,
      all: all == "true",
      dateEnd: dateEnd ? String(dateEnd) : "",
      dateStart: dateStart ? String(dateStart) : "",
      status: status ? String(status) : "",
    });

    return res.json(leads);
  }
}

export { ListMyLeadsController };
