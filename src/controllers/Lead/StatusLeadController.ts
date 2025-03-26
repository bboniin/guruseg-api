import { Request, Response } from 'express';
import { StatusLeadService } from '../../services/Lead/StatusLeadService';

class StatusLeadController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { label, status } = req.body

        const statusLeadService = new StatusLeadService

        const lead = await statusLeadService.execute({
            id, label, status
        })

        return res.json(lead)
    }
}

export { StatusLeadController } 