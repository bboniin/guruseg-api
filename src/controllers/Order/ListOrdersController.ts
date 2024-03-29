import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/Order/ListOrdersService';

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const { type } = req.params

        const { finance, endDate, startDate } = req.query

        let userId = req.userId

        const listOrdersService = new ListOrdersService

        const orders = await listOrdersService.execute({
            type, userId, finance: finance == "true", endDate: new Date(String(endDate)), startDate: new Date(String(startDate))
        })

        return res.json(orders)
    }
}

export { ListOrdersController }