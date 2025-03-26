import { Request, Response } from 'express';
import { CheckTimelineService } from '../../services/CompanyTimeline/CheckTimelineService';

class CheckTimelineController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
    
        const checkTimelineService = new CheckTimelineService

        const timeline = await checkTimelineService.execute({
            id
        })

        return res.json(timeline)
    }
}

export { CheckTimelineController } 