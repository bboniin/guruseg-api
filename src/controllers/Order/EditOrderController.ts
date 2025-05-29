import { Request, Response } from "express";
import { EditOrderService } from "../../services/Order/EditOrderService";

class EditOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { observation, company_id } = req.body;

    let userId = req.userId;

    const editOrderService = new EditOrderService();

    const order = await editOrderService.execute({
      observation,
      company_id,
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

export { EditOrderController };
