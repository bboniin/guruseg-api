import { Request, Response } from "express";
import { SendOrderUrgentService } from "../../services/Order/SendOrderUrgentService";

class SendOrderUrgentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { collaborator_id } = req.body;

    let userId = req.userId;

    const sendOrderUrgentService = new SendOrderUrgentService();

    const order = await sendOrderUrgentService.execute({
      collaborator_id,
      userId,
      id: parseInt(id),
    });

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

export { SendOrderUrgentController };
