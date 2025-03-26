import { Request, Response } from 'express';
import { EditTimelineService } from '../../services/CompanyTimeline/EditTimelineService';

class EditTimelineController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { 
            name,
            date_reminder,
            observation,
            renewal_id
        } = req.body
        
        const editTimelineService = new EditTimelineService

        const timeline = await editTimelineService.execute({
            id,
            name,
            date_reminder,
            renewal_id,
            observation
        })

        return res.json(timeline)
    }
}

export { EditTimelineController } 