import { Request, Response } from 'express';
import { CreateReminderService } from '../../services/Reminder/CreateReminderService';

class CreateReminderController {
    async handle(req: Request, res: Response) {

        const { lead_id } = req.params

        const { name, description, date } = req.body

        let userId = req.userId

        const createReminderService = new CreateReminderService

        const reminder = await createReminderService.execute({
            name,
            description,
            date,
            lead_id,
            userId
        })

        return res.json(reminder)
    }
}

export { CreateReminderController }