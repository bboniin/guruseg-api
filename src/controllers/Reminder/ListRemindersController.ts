import { Request, Response } from 'express';
import { ListRemindersService } from '../../services/Reminder/ListRemindersService';

class ListRemindersController {
    async handle(req: Request, res: Response) {

        const { page, dateStart, dateEnd, lead_id, status } = req.query

        let userId = req.userId

        const listRemindersService = new ListRemindersService

        const Reminders = await listRemindersService.execute({
            page: Number(page) || 0, userId: userId ? String(userId) : "", lead_id: lead_id ? String(lead_id) : "",
            dateEnd: dateEnd ? String(dateEnd) : "", dateStart: dateStart ? String(dateStart) : "", status: status ? String(status) : ""
        })

        return res.json(Reminders)
    }
}

export { ListRemindersController }