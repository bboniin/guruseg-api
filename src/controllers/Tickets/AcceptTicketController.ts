import { Request, Response } from "express";
import { AcceptTicketService } from "../../services/Tickets/AcceptTicketService";

class AcceptTicketController {
  async handle(req: Request, res: Response) {
    const { ticket_id } = req.params;

    const userId = req.userId;

    const acceptTicketService = new AcceptTicketService();

    const ticket = await acceptTicketService.execute({
      userId,
      ticket_id,
    });

    return res.json(ticket);
  }
}

export { AcceptTicketController };
