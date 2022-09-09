import { Request, Response } from 'express';
import { DeleteDocOrderService } from '../../services/Order/DeleteDocOrderService';

class DeleteDocOrderController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { type } = req.query

        const deleteDocOrderService = new DeleteDocOrderService

        const order = await deleteDocOrderService.execute({
            id, type: String(type)
        })

        return res.json(order)
    }
}

export { DeleteDocOrderController }