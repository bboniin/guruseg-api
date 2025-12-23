import { Request, Response } from "express";
import { OpenTicketService } from "../../services/Tickets/OpenTicketService";

class OpenTicketController {
  async handle(req: Request, res: Response) {
    const { content, send_type, order_id } = req.body;

    const userId = req.userId;

    const openTicketService = new OpenTicketService();

    const ticket = await openTicketService.execute({
      userId,
      content,
      send_type,
      order_id,
    });

    return res.json(ticket);
  }
}

export { OpenTicketController };
