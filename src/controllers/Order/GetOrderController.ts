import { Request, Response } from "express";
import { GetOrderService } from "../../services/Order/GetOrderService";

class GetOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const getOrderService = new GetOrderService();

    const order = await getOrderService.execute({
      userId,
      id: parseInt(id),
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

export { GetOrderController };
