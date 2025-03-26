import { Request, Response } from "express";
import { ListPaymentsService } from "../../services/Payment/ListPaymentsService";

class ListPaymentsController {
  async handle(req: Request, res: Response) {
    let { page, order_id } = req.query;
    let userId = req.userId;

    const listPaymentsService = new ListPaymentsService();

    const payments = await listPaymentsService.execute({
      userId,
      order_id: Number(order_id) > 0 ? Number(order_id) : 0,
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(payments);
  }
}

export { ListPaymentsController };
