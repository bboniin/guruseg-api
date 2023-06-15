import { Request, Response } from 'express';
import { HandlerOrderService } from '../../services/Order/HandlerOrderService';

class HandlerOrderController {
    async handle(req: Request, res: Response) {
        const { message, items, order_id } = req.body

        let userId = req.userId

        const handlerOrderService = new HandlerOrderService

        const order = await handlerOrderService.execute({
            message, items, order_id, userId
        })

        return res.json(order)
    }
}

export { HandlerOrderController } 