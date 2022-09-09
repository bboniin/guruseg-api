import { Request, Response } from 'express';
import { CancelOrderService } from '../../services/Order/CancelOrderService';

class CancelOrderController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const cancelOrderService = new CancelOrderService

        const order = await cancelOrderService.execute({
            id: parseInt(id)
        })

        return res.json(order)
    }
}

export { CancelOrderController }