import { Request, Response } from 'express';
import { ListTimelinesService } from '../../services/CompanyTimeline/ListTimelinesService';

class ListTimelinesController {
    async handle(req: Request, res: Response) {

        let { region } = req.query

        const listTimelinesService = new ListTimelinesService

        const timelines = await listTimelinesService.execute({
            region: String(region)
        })

        return res.json(timelines)
    }
}

export { ListTimelinesController }