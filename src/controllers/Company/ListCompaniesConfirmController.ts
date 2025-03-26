import { Request, Response } from 'express';
import { ListCompaniesConfirmService } from '../../services/Company/ListCompaniesConfirmService';

class ListCompaniesConfirmController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listCompaniesConfirmService = new ListCompaniesConfirmService

        const companies = await listCompaniesConfirmService.execute({
            userId
        })

        return res.json(companies)
    }
}

export { ListCompaniesConfirmController }