import { Request, Response } from "express";
import { ListOrdersService } from "../../services/Order/ListOrdersService";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const { type } = req.params;

    const {
      finance,
      endDate,
      status,
      startDate,
      page,
      collaborator_id,
      id,
      user_id,
    } = req.query;

    let userId = req.userId;

    const listOrdersService = new ListOrdersService();

    const orders = await listOrdersService.execute({
      type,
      userId: id ? String(id) : userId,
      finance: finance == "true",
      endDate: endDate ? String(endDate) : "",
      status: status ? String(status) : "",
      startDate: startDate ? String(startDate) : "",
      collaborator_id: collaborator_id ? String(collaborator_id) : "",
      user_id: user_id ? String(user_id) : "",
      page: Number(page) || 0,
    });

    return res.json(orders);
  }
}

export { ListOrdersController };
