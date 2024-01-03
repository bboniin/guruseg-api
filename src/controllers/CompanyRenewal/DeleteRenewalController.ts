import { Request, Response } from 'express';
import { DeleteRenewalService } from '../../services/CompanyRenewal/DeleteRenewalService';

class DeleteRenewalController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        
        const deleteRenewalService = new DeleteRenewalService

        const renewal = await deleteRenewalService.execute({
            id
        })

        return res.json(renewal)
    }
}

export { DeleteRenewalController } 