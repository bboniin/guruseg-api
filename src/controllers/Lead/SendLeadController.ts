import { Request, Response } from 'express';
import { SendLeadService } from '../../services/Lead/SendLeadService';

class SendLeadController {
    async handle(req: Request, res: Response) {

        const { userId, leads } = req.body

        const sendLeadService = new SendLeadService

        const lead = await sendLeadService.execute({
            userId, leads
        })

        return res.json(lead)
    }
}

export { SendLeadController } 