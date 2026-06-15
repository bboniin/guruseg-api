import { Request, Response } from "express";
import { CreatePaymentComissionAssociateService } from "../../../services/Admin/Associates/CreatePaymentComissionAssociateService";

class CreatePaymentComissionAssociateController {
  async handle(req: Request, res: Response) {
    const { description, value, associate_id } = req.body;

    const createPaymentComissionAssociateService =
      new CreatePaymentComissionAssociateService();

    const payment = await createPaymentComissionAssociateService.execute({
      description,
      associate_id,
      value,
    });

    return res.json(payment);
  }
}

export { CreatePaymentComissionAssociateController };
