import { Request, Response } from 'express';
import { ResetLeadService } from '../../services/Lead/ResetLeadService';

class ResetLeadController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const resetLeadService = new ResetLeadService

        const lead = await resetLeadService.execute({
            id
        })

        return res.json(lead)
    }
}

export { ResetLeadController } 