import { Request, Response } from "express";
import { CreatePaymentService } from "../../services/Payment/CreatePaymentService";

class CreatePaymentController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.params;

    let userId = req.userId;

    const createPaymentService = new CreatePaymentService();

    const Payment = await createPaymentService.execute({
      order_id: order_id ? Number(order_id) : 0,
      userId,
    });

    return res.json(Payment);
  }
}

export { CreatePaymentController };
