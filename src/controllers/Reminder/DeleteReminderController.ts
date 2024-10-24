import { Request, Response } from 'express';
import { DeleteReminderService } from '../../services/Reminder/DeleteReminderService';

class DeleteReminderController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteReminderService = new DeleteReminderService

        const reminder = await deleteReminderService.execute({
            id
        })

        return res.json(reminder)
    }
}

export { DeleteReminderController }