import { Request, Response } from 'express';
import { CreateTimelineService } from '../../services/CompanyTimeline/CreateTimelineService';

class CreateTimelineController {
    async handle(req: Request, res: Response) {
        const { 
            name,
            renewal_id,
            date_reminder,
            observation
        } = req.body
        
        const createTimelineService = new CreateTimelineService

        const timeline = await createTimelineService.execute({
            name,
            renewal_id,
            date_reminder,
            observation
        })

        return res.json(timeline)
    }
}

export { CreateTimelineController } 