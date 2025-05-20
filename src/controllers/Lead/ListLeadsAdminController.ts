import { Request, Response } from "express";
import { ListLeadsAdminService } from "../../services/Lead/ListLeadsAdminService";

class ListLeadsAdminController {
  async handle(req: Request, res: Response) {
    const { page, dateStart, dateEnd, userId, status } = req.query;

    const listLeadsAdminService = new ListLeadsAdminService();

    const leads = await listLeadsAdminService.execute({
      page: Number(page) || 0,
      userId: userId ? String(userId) : "",
      status: status ? String(status) : "",
      dateEnd: dateEnd ? String(dateEnd) : "",
      dateStart: dateStart ? String(dateStart) : "",
    });

    return res.json(leads);
  }
}

export { ListLeadsAdminController };
