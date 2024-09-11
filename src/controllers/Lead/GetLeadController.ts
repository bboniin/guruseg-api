import { Request, Response } from 'express';
import { GetLeadService } from '../../services/Lead/GetLeadService';

class GetLeadController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const getLeadService = new GetLeadService

        const lead = await getLeadService.execute({
            id
        })

        return res.json(lead)
    }
}

export { GetLeadController } 