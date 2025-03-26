import { Request, Response } from 'express';
import { ConfirmReminderService } from '../../services/Reminder/ConfirmReminderService';

class ConfirmReminderController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { repeat, date_repeat, description, name } = req.body

        const confirmReminderService = new ConfirmReminderService

        const reminder = await confirmReminderService.execute({
            repeat: repeat, date_repeat: date_repeat, id: id, description, name
        })

        return res.json(reminder)
    }
}

export { ConfirmReminderController }