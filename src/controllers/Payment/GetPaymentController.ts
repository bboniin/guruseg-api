import { Request, Response } from "express";
import { GetPaymentService } from "../../services/Payment/GetPaymentService";

class GetPaymentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const getPaymentService = new GetPaymentService();

    const payment = await getPaymentService.execute({
      payment_id: id,
      userId,
    });

    return res.json(payment);
  }
}

export { GetPaymentController };
