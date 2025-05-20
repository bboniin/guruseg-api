import { Request, Response } from "express";
import { EditOrderService } from "../../services/Order/EditOrderService";

class EditOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { observation, company_id } = req.body;

    let userId = req.userId;

    const editOrderService = new EditOrderService();

    const services = await editOrderService.execute({
      observation,
      company_id,
      userId,
      id: parseInt(id),
    });

    return res.json(services);
  }
}

export { EditOrderController };
