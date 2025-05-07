import { Request, Response } from "express";
import { GeneratePaymentService } from "../../services/Payment/GeneratePaymentService";

class GeneratePaymentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const generatePaymentService = new GeneratePaymentService();

    const order = await generatePaymentService.execute({
      order_id: parseInt(id),
      userId,
    });

    if (order["user"].photo) {
      order["user"]["photo_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" +
        order["user"].photo;
    }

    if (order["collaborator"]) {
      if (order["collaborator"].photo) {
        order["collaborator"]["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" +
          order["collaborator"].photo;
      }
    }

    return res.json(order);
  }
}

export { GeneratePaymentController };
