import { Request, Response } from "express";
import { EditReminderService } from "../../services/Reminder/EditReminderService";

class EditReminderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { name, description, date, expiration_date } = req.body;

    const editReminderService = new EditReminderService();

    const userId = req.userId;

    const reminder = await editReminderService.execute({
      name,
      description,
      date,
      id,
      expiration_date,
      userId,
    });

    return res.json(reminder);
  }
}

export { EditReminderController };
