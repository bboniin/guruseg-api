import { Request, Response } from 'express';
import { ListRenewalsService } from '../../services/CompanyRenewal/ListRenewalsService';

class ListRenewalsController {
    async handle(req: Request, res: Response) {

        let { region } = req.query

        const listRenewalsService = new ListRenewalsService

        const renewals = await listRenewalsService.execute({
            region: region ? String(region) : ""
        })

        return res.json(renewals)
    }
}

export { ListRenewalsController }