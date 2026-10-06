import { Request, Response } from "express";
import { ListAssociateLeadsService } from "../../services/Associate/ListAssociateLeadsService";

class ListAssociateLeadsController {
  async handle(req: Request, res: Response) {
    const { page, dateStart, dateEnd, status, search } = req.query;
    const associate_id = req.userId;

    const listAssociateLeadsService = new ListAssociateLeadsService();

    const leads = await listAssociateLeadsService.execute({
      associate_id,
      page: Number(page) || 0,
      dateStart: dateStart as string,
      dateEnd: dateEnd as string,
      status: status as string,
      search: search as string,
    });

    return res.json(leads);
  }
}

export { ListAssociateLeadsController };
