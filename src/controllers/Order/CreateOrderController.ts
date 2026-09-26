import { Request, Response } from "express";
import { CreateOrderService } from "../../services/Order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const {
      observation,
      items,
      sector,
      name,
      code,
      collaborators,
      company_id,
      enterprise_id,
      reminder,
      type,
      delivery_time,
      acquisition_channel,
    } = req.body;

    let userId = req.userId;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({
      observation,
      items,
      userId,
      name,
      sector,
      company_id,
      enterprise_id,
      collaborators,
      code,
      reminder,
      type,
      delivery_time: delivery_time ? Number(delivery_time) : 5,
      acquisition_channel,
    });

    return res.json(order);
  }
}

export { CreateOrderController };
