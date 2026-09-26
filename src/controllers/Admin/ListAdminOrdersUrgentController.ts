import { Request, Response } from "express";
import { ListAdminOrdersUrgentService } from "../../services/Admin/ListAdminOrdersUrgentService";

class ListAdminOrdersUrgentController {
  async handle(req: Request, res: Response) {
    const listAdminOrdersUrgentService = new ListAdminOrdersUrgentService();

    const orders = await listAdminOrdersUrgentService.execute();

    return res.json(orders);
  }
}

export { ListAdminOrdersUrgentController };
