import { Request, Response } from "express";
import { CreateReminderService } from "../../services/Reminder/CreateReminderService";

class CreateReminderController {
  async handle(req: Request, res: Response) {
    const {
      name,
      description,
      date,
      expiration_date,
      type,
      order_id,
      lead_id,
    } = req.body;

    const userId = req.userId;

    const createReminderService = new CreateReminderService();

    const reminder = await createReminderService.execute({
      name,
      description,
      date,
      lead_id,
      userId,
      expiration_date,
      type,
      order_id,
    });

    return res.json(reminder);
  }
}

export { CreateReminderController };
