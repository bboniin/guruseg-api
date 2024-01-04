import { Request, Response } from 'express';
import { DeleteAllRenewalService } from '../../services/CompanyRenewal/DeleteAllRenewalService';

class DeleteAllRenewalController {
    async handle(req: Request, res: Response) {
        
        const deleteAllRenewalService = new DeleteAllRenewalService

        const renewal = await deleteAllRenewalService.execute()

        return res.json(renewal)
    }
}

export { DeleteAllRenewalController } 