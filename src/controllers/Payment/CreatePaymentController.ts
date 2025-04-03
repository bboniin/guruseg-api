import { Request, Response } from "express";
import { CreatePaymentService } from "../../services/Payment/CreatePaymentService";

class CreatePaymentController {
  async handle(req: Request, res: Response) {
    const { code, order_id } = req.body;

    let userId = req.userId;

    const createPaymentService = new CreatePaymentService();

    const Payment = await createPaymentService.execute({
      order_id: parseInt(order_id),
      userId,
      code: code,
    });

    return res.json(Payment);
  }
}

export { CreatePaymentController };
