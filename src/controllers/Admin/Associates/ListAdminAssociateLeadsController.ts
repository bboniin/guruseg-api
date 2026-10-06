import { Request, Response } from "express";
import { ListAdminAssociateLeadsService } from "../../../services/Admin/Associates/ListAdminAssociateLeadsService";

class ListAdminAssociateLeadsController {
  async handle(req: Request, res: Response) {
    const { page, dateStart, dateEnd, status, search } = req.query;

    const { associate_id } = req.params;

    const listAdminAssociateLeadsService = new ListAdminAssociateLeadsService();

    const leads = await listAdminAssociateLeadsService.execute({
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

export { ListAdminAssociateLeadsController };
