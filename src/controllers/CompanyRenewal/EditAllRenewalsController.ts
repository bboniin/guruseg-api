import { Request, Response } from 'express';
import { EditAllRenewalsService } from '../../services/CompanyRenewal/EditAllRenewalsService';

class EditAllRenewalsController {
    async handle(req: Request, res: Response) {

        let { region, newRegion } = req.body

        const editAllRenewalsService = new EditAllRenewalsService

        const renewals = await editAllRenewalsService.execute({
            region, newRegion
        })

        return res.json(renewals)
    }
}

export { EditAllRenewalsController }