import { Request, Response } from 'express';
import { StatusOrderService } from '../../services/Order/StatusOrderService';

class StatusOrderController {
    async handle(req: Request, res: Response) {

        const { id } = req.params
        const { message, status } = req.body

        let userId = req.userId

        const statusOrderService = new StatusOrderService

        const services = await statusOrderService.execute({
            userId, id: parseInt(id), message, status
        })


        return res.json(services)
    }
}

export { StatusOrderController }