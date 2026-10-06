import { Request, Response } from "express";
import { GetOrderService } from "../../services/Order/GetOrderService";

class GetOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const getOrderService = new GetOrderService();

    const order = await getOrderService.execute({
      userId,
      id: parseInt(id),
    });

    return res.json(order);
  }
}

export { GetOrderController };
