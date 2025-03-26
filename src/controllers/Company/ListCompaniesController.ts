import { Request, Response } from 'express';
import { ListCompaniesService } from '../../services/Company/ListCompaniesService';

class ListCompaniesController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listCompaniesService = new ListCompaniesService

        const companies = await listCompaniesService.execute({
            userId
        })

        return res.json(companies)
    }
}

export { ListCompaniesController }