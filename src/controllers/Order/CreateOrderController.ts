import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/Order/CreateOrderService';

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { observation, items, month, urgent, sector, name, company_id} = req.body

        let userId = req.userId

        const createOrderService = new CreateOrderService

        const order = await createOrderService.execute({
            observation, items, userId, name, month, urgent, sector, company_id
        })

        return res.json(order)
    }
}

export { CreateOrderController } 