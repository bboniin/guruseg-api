import { Request, Response } from 'express';
import { SendLeadsService } from '../../services/Lead/SendLeadsService';

class SendLeadsController {
    async handle(req: Request, res: Response) {

        const { userId, leads } = req.body

        const sendLeadsService = new SendLeadsService

        const lead = await sendLeadsService.execute({
            userId, leads
        })

        return res.json(lead)
    }
}

export { SendLeadsController } 