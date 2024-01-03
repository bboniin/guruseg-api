import { Request, Response } from 'express';
import { GetTimelineService } from '../../services/CompanyTimeline/GetTimelineService';

class GetTimelineController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        
        const getTimelineService = new GetTimelineService

        const timeline = await getTimelineService.execute({
            id,
        })

        return res.json(timeline)
    }
}

export { GetTimelineController } 