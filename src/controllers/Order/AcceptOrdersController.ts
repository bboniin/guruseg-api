import { Request, Response } from 'express';
import { AcceptOrderService } from '../../services/Order/AcceptOrderService';

class AcceptOrderController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const { message } = req.body

        let userId = req.userId

        const acceptOrderService = new AcceptOrderService

        const services = await acceptOrderService.execute({
            message, userId, id: parseInt(id)
        })


        return res.json(services)
    }
}

export { AcceptOrderController }