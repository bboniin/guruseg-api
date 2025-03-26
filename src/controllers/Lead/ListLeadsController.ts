import { Request, Response } from 'express';
import { ListLeadsService } from '../../services/Lead/ListLeadsService';

class ListLeadsController {
    async handle(req: Request, res: Response) {

        const { page, status, all, userId, dateStart, dateEnd} = req.query

        const listLeadsService = new ListLeadsService

        const leads = await listLeadsService.execute({
            page: Number(page) || 0, all: all == "true", status: status ? String(status) : "", userId: userId ? String(userId) : "",
            dateEnd: dateEnd ? String(dateEnd) : "", dateStart: dateStart ? String(dateStart) : ""
        })

        return res.json(leads)
    }
}

export { ListLeadsController }