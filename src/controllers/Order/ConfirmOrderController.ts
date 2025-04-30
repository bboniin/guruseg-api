import { Request, Response } from "express";
import { ConfirmOrderService } from "../../services/Order/ConfirmOrderService";

class ConfirmOrderController {
  async handle(req: Request, res: Response) {
    const { message, user_id } = req.body;

    const { id } = req.params;

    let userId = req.userId;

    const confirmOrderService = new ConfirmOrderService();

    const services = await confirmOrderService.execute({
      userId: user_id || userId,
      id: parseInt(id),
      message,
    });

    return res.json(services);
  }
}

export { ConfirmOrderController };
