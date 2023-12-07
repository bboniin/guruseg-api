import { Request, Response } from 'express';
import { RecusedDocOrderService } from '../../services/Order/RecusedDocOrderService';

class RecusedDocOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.params
        const { observation } = req.body

        let userId = req.userId
        
        const recusedDocOrderService = new RecusedDocOrderService

        const order = await recusedDocOrderService.execute({
            order_id: Number(order_id), observation, userId
        })

        return res.json(order)
    }
}

export { RecusedDocOrderController }