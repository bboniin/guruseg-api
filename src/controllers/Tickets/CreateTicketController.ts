import { Request, Response } from "express";
import { CreateTicketService } from "../../services/Tickets/CreateTicketService";

class CreateTicketController {
  async handle(req: Request, res: Response) {
    const { content, ticket_id, send_id, send_type } = req.body;

    const userId = req.userId;

    const createTicketService = new CreateTicketService();

    const ticket = await createTicketService.execute({
      userId,
      content,
      ticket_id,
      send_id,
      send_type,
    });

    return res.json(ticket);
  }
}

export { CreateTicketController };
