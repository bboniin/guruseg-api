import { Request, Response } from "express";
import { SendMessageTicketService } from "../../services/Tickets/SendMessageTicketService";

class SendMessageTicketController {
  async handle(req: Request, res: Response) {
    const { ticket_id } = req.params;
    const { content, send_type } = req.body;

    const userId = req.userId;

    const sendMessageTicketService = new SendMessageTicketService();

    const ticket = await sendMessageTicketService.execute({
      userId,
      content,
      send_type,
      ticket_id,
    });

    return res.json(ticket);
  }
}

export { SendMessageTicketController };
