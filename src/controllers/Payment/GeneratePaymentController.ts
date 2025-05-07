import { Request, Response } from "express";
import { GeneratePaymentService } from "../../services/Payment/GeneratePaymentService";

class GeneratePaymentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const generatePaymentService = new GeneratePaymentService();

    const Payment = await generatePaymentService.execute({
      order_id: parseInt(id),
      userId,
    });

    return res.json(Payment);
  }
}

export { GeneratePaymentController };
