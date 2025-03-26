import { Request, Response } from "express";
import { ListAdminPaymentsService } from "../../services/Payment/ListAdminPaymentsService";

class ListAdminPaymentsController {
  async handle(req: Request, res: Response) {
    let { page, order_id, search } = req.query;
    let userId = req.userId;

    const listAdminPaymentsService = new ListAdminPaymentsService();

    const payments = await listAdminPaymentsService.execute({
      userId,
      search: String(search) || "",
      order_id: Number(order_id) > 0 ? Number(order_id) : 0,
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(payments);
  }
}

export { ListAdminPaymentsController };
