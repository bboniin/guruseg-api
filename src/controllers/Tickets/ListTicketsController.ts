import { Request, Response } from "express";
import { ListTicketsService } from "../../services/Tickets/ListTicketsService";

class ListTicketsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const userId = req.userId;

    const listTicketsService = new ListTicketsService();

    const ticket = await listTicketsService.execute({
      userId,
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(ticket);
  }
}

export { ListTicketsController };
