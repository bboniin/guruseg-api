import { Request, Response } from "express";
import { ListAdminAssociatePaymentsService } from "../../../services/Admin/Associates/ListAdminAssociatePaymentsService";

class ListAdminAssociatePaymentsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const { associate_id } = req.params;

    const listAdminAssociatePaymentsService =
      new ListAdminAssociatePaymentsService();

    const payments = await listAdminAssociatePaymentsService.execute({
      associate_id,
      page: Number(page) || 0,
    });

    return res.json(payments);
  }
}

export { ListAdminAssociatePaymentsController };
