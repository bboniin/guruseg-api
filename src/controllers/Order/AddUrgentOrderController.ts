import { Request, Response } from "express";
import { AddUrgentOrderService } from "../../services/Order/AddUrgentOrderService";

class AddUrgentOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const addUrgentOrderService = new AddUrgentOrderService();

    const order = await addUrgentOrderService.execute({
      userId,
      id: parseInt(id),
    });

    return res.json(order);
  }
}

export { AddUrgentOrderController };
