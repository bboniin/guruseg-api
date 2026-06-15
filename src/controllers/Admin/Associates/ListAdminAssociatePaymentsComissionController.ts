import { Request, Response } from "express";
import { ListAdminAssociatePaymentsComissionService } from "../../../services/Admin/Associates/ListAdminAssociatePaymentsComissionService";

class ListAdminAssociatePaymentsComissionController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const { associate_id } = req.params;

    const listAdminAssociatePaymentsComissionService =
      new ListAdminAssociatePaymentsComissionService();

    const paymentsComission =
      await listAdminAssociatePaymentsComissionService.execute({
        associate_id,
        page: Number(page) || 0,
      });

    return res.json(paymentsComission);
  }
}

export { ListAdminAssociatePaymentsComissionController };
