import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/Order/ListOrdersService';

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const { type } = req.params

        const { month } = req.query

        let userId = req.userId

        const listOrdersService = new ListOrdersService

        const orders = await listOrdersService.execute({
            type, userId, month: String(month)
        })

        return res.json(orders)
    }
}

export { ListOrdersController }