import { Request, Response } from 'express';
import { RecusedOrderService } from '../../services/Order/RecusedOrderService';

class RecusedOrderController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const { message } = req.body

        let userId = req.userId

        const recusedOrderService = new RecusedOrderService

        const services = await recusedOrderService.execute({
            message, userId, id: parseInt(id)
        })


        return res.json(services)
    }
}

export { RecusedOrderController }