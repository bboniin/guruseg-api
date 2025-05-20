import { Request, Response } from "express";
import { ListLeadsSendService } from "../../services/Lead/ListLeadsSendService";

class ListLeadsSendController {
  async handle(req: Request, res: Response) {
    const { page, all, dateStart, dateEnd } = req.query;

    const listLeadsSendService = new ListLeadsSendService();

    const leads = await listLeadsSendService.execute({
      page: Number(page) || 0,
      all: all == "true",
      dateEnd: dateEnd ? String(dateEnd) : "",
      dateStart: dateStart ? String(dateStart) : "",
    });

    return res.json(leads);
  }
}

export { ListLeadsSendController };
