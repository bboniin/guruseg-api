import { Request, Response } from "express";
import { ConfirmReminderService } from "../../services/Reminder/ConfirmReminderService";

class ConfirmReminderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { repeat, date_repeat, description, date_expiration, name } =
      req.body;

    const userId = req.userId;

    const confirmReminderService = new ConfirmReminderService();

    const reminder = await confirmReminderService.execute({
      repeat,
      date_repeat,
      date_expiration,
      id,
      description,
      name,
      userId,
    });

    return res.json(reminder);
  }
}

export { ConfirmReminderController };
