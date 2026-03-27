import { Request, Response } from "express";
import { ListAssociatePaymentsService } from "../../services/Associate/ListAssociatePaymentsService";

class ListAssociatePaymentsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const userId = req.userId;

    const listAssociatePaymentsService = new ListAssociatePaymentsService();

    const payments = await listAssociatePaymentsService.execute({
      userId,
      page: Number(page) || 0,
    });

    return res.json(payments);
  }
}

export { ListAssociatePaymentsController };
