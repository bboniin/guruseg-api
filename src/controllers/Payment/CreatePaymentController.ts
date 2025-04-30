import { Request, Response } from "express";
import { CreatePaymentService } from "../../services/Payment/CreatePaymentService";

class CreatePaymentController {
  async handle(req: Request, res: Response) {
    const { code, cpf } = req.body;

    const { id } = req.params;

    let userId = req.userId;

    const createPaymentService = new CreatePaymentService();

    const Payment = await createPaymentService.execute({
      order_id: parseInt(id),
      userId,
      code: code,
      cpf: cpf,
    });

    return res.json(Payment);
  }
}

export { CreatePaymentController };
