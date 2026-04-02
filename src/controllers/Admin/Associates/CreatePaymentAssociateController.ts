import { Request, Response } from "express";
import { CreatePaymentAssociateService } from "../../../services/Admin/Associates/CreatePaymentAssociateService";

class CreatePaymentAssociateController {
  async handle(req: Request, res: Response) {
    const { description, value, associate_id } = req.body;

    const createPaymentAssociateService = new CreatePaymentAssociateService();

    const payment = await createPaymentAssociateService.execute({
      description,
      associate_id,
      value,
    });

    return res.json(payment);
  }
}

export { CreatePaymentAssociateController };
