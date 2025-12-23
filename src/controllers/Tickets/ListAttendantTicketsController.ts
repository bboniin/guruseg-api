import { Request, Response } from "express";
import { ListAttendantTicketsService } from "../../services/Tickets/ListAttendantTicketsService";

class ListAttendantTicketsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const userId = req.userId;

    const listAttendantTicketsService = new ListAttendantTicketsService();

    const ticket = await listAttendantTicketsService.execute({
      page: Number(page) > 0 ? Number(page) : 0,
      userId,
    });

    return res.json(ticket);
  }
}

export { ListAttendantTicketsController };
