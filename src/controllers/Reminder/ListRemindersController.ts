import { Request, Response } from "express";
import { ListRemindersService } from "../../services/Reminder/ListRemindersService";

class ListRemindersController {
  async handle(req: Request, res: Response) {
    const { page, dateStart, dateEnd, lead_id, order_id, type, status } =
      req.query;

    const userId = req.userId;

    const listRemindersService = new ListRemindersService();

    const Reminders = await listRemindersService.execute({
      page: Number(page) || 0,
      userId: userId ? String(userId) : "",
      lead_id: lead_id ? String(lead_id) : "",
      type: type ? String(type) : "",
      order_id: Number(order_id) || 0,
      dateEnd: dateEnd ? String(dateEnd) : "",
      dateStart: dateStart ? String(dateStart) : "",
      status: status ? String(status) : "",
    });

    return res.json(Reminders);
  }
}

export { ListRemindersController };
