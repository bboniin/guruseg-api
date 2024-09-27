import { Request, Response } from 'express';
import { SendLeadService } from '../../services/Lead/SendLeadService';

class SendLeadController {
    async handle(req: Request, res: Response) {

        const { leadId, users } = req.body

        const sendLeadService = new SendLeadService

        const lead = await sendLeadService.execute({
            leadId, users
        })

        return res.json(lead)
    }
}

export { SendLeadController } 