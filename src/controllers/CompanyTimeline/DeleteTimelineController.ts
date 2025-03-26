import { Request, Response } from 'express';
import { DeleteTimelineService } from '../../services/CompanyTimeline/DeleteTimelineService';

class DeleteTimelineController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        
        const deleteTimelineService = new DeleteTimelineService

        const timeline = await deleteTimelineService.execute({
            id
        })

        return res.json(timeline)
    }
}

export { DeleteTimelineController } 