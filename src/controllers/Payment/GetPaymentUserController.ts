import { Request, Response } from "express";
import { GetPaymentUserService } from "../../services/Payment/GetPaymentUserService";

class GetPaymentUserController {
  async handle(req: Request, res: Response) {
    const getPaymentUserService = new GetPaymentUserService();

    const payment = await getPaymentUserService.execute();

    return res.json(payment);
  }
}

export { GetPaymentUserController };
