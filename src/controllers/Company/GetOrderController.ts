import { Request, Response } from 'express';
import { GetCompanyService } from '../../services/Company/GetCompanyService';

class GetCompanyController {
    async handle(req: Request, res: Response) {
        const { company_id } = req.params

        const getCompanyService = new GetCompanyService

        const company = await getCompanyService.execute({
            company_id
        })
        return res.json(company)
    }
}

export { GetCompanyController }