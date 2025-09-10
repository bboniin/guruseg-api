import { Request, Response } from "express";
import { ListAdminOrdersUrgentService } from "../../services/Admin/ListAdminOrdersUrgentService";

class ListAdminOrdersUrgentController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const listAdminOrdersUrgentService = new ListAdminOrdersUrgentService();

    const orders = await listAdminOrdersUrgentService.execute({
      userId,
    });

    return res.json(orders);
  }
}

export { ListAdminOrdersUrgentController };
