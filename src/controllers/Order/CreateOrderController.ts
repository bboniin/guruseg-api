import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/Order/CreateOrderService';

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { observation, items, month } = req.body

        let userId = req.userId

        const createOrderService = new CreateOrderService

        const order = await createOrderService.execute({
            observation, items, userId, month
        })

        return res.json(order)
    }
}

export { CreateOrderController } 