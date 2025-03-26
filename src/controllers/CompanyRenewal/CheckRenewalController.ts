import { Request, Response } from 'express';
import { CheckRenewalService } from '../../services/CompanyRenewal/CheckRenewalService';

class CheckRenewalController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        
        const { date_renewal, observation} = req.body
        const checkRenewalService = new CheckRenewalService

        const renewal = await checkRenewalService.execute({
            id, date_renewal, observation
        })

        return res.json(renewal)
    }
}

export { CheckRenewalController } 