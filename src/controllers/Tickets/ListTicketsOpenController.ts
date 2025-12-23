import { Request, Response } from "express";
import { ListTicketsOpenService } from "../../services/Tickets/ListTicketsOpenService";

class ListTicketsOpenController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const listTicketsOpenService = new ListTicketsOpenService();

    const ticket = await listTicketsOpenService.execute({
      userId,
    });

    return res.json(ticket);
  }
}

export { ListTicketsOpenController };
