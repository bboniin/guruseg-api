import { Request, Response } from 'express';
import { ListLeadsCloseService } from '../../services/Lead/ListLeadsCloseService';

class ListLeadsCloseController {
    async handle(req: Request, res: Response) {

        const { page, dateStart, dateEnd, userId} = req.query

        const listLeadsCloseService = new ListLeadsCloseService

        const leads = await listLeadsCloseService.execute({
            page: Number(page) || 0, userId: userId ? String(userId) : "",
            dateEnd: dateEnd ? String(dateEnd) : "", dateStart: dateStart ? String(dateStart) : ""
        })

        return res.json(leads)
    }
}

export { ListLeadsCloseController }