import { Request, Response } from "express";
import { ListAdminOrdersService } from "../../services/Order/ListAdminOrdersService";

class ListAdminOrdersController {
  async handle(req: Request, res: Response) {
    const {
      endDate,
      id,
      startDate,
      page,
      status,
      status_payment,
      user_id,
      collaborator_id,
    } = req.query;

    let userId = req.userId;

    const listAdminOrdersService = new ListAdminOrdersService();

    const orders = await listAdminOrdersService.execute({
      userId,
      id: id ? Number(id) : 0,
      status: status ? String(status) : "",
      collaborator_id: collaborator_id ? String(collaborator_id) : "",
      status_payment: status_payment ? String(status_payment) : "",
      user_id: user_id ? String(user_id) : "",
      endDate: endDate ? String(endDate) : "",
      startDate: startDate ? String(startDate) : "",
      page: Number(page) || 0,
    });

    return res.json(orders);
  }
}

export { ListAdminOrdersController };
