import { Request, Response } from "express";
import { ListAdminTicketsService } from "../../services/Tickets/ListAdminTicketsService";

class ListAdminTicketsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const userId = req.userId;

    const listAdminTicketsService = new ListAdminTicketsService();

    const ticket = await listAdminTicketsService.execute({
      userId,
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(ticket);
  }
}

export { ListAdminTicketsController };
