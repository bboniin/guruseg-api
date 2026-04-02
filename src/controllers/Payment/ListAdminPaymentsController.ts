import { Request, Response } from "express";
import { ListAdminPaymentsService } from "../../services/Payment/ListAdminPaymentsService";

class ListAdminPaymentsController {
  async handle(req: Request, res: Response) {
    const { page, startDate, endDate, method, user_id, status, type } =
      req.query;
    const userId = req.userId;

    const listAdminPaymentsService = new ListAdminPaymentsService();

    const payments = await listAdminPaymentsService.execute({
      userId,
      type: type ? String(type) : "",
      status: status ? String(status) : "",
      method: method ? String(method) : "",
      user_id: user_id ? String(user_id) : "",
      startDate: startDate ? String(startDate) : "",
      endDate: endDate ? String(endDate) : "",
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(payments);
  }
}

export { ListAdminPaymentsController };
