import { Request, Response } from "express";
import { GetTicketService } from "../../services/Tickets/GetTicketService";

class GetTicketController {
  async handle(req: Request, res: Response) {
    const { ticket_id } = req.params;

    const userId = req.userId;

    const getTicketService = new GetTicketService();

    const ticket = await getTicketService.execute({
      userId,
      ticket_id,
    });

    return res.json(ticket);
  }
}

export { GetTicketController };
