import { Request, Response } from 'express';
import { AcceptOrderService } from '../../services/Order/AcceptOrderService';

class ExpireContractController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId

        const acceptOrderService = new AcceptOrderService

        const services = await acceptOrderService.execute({
            userId, id: parseInt(id)
        })


        return res.json(services)
    }
}

export { ExpireContractController }