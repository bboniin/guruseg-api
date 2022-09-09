import { Request, Response } from 'express';
import { ListOpenOrdersService } from '../../services/Order/ListOpenOrdersService';

class ListOpenOrdersController {
    async handle(req: Request, res: Response) {


        let userId = req.userId

        const listOpenOrdersService = new ListOpenOrdersService

        const orders = await listOpenOrdersService.execute({
            userId
        })

        return res.json(orders)
    }
}

export { ListOpenOrdersController }