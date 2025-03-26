import { Request, Response } from 'express';
import { CreateCompanyService } from '../../services/Company/CreateCompanyService';

class CreateCompanyController {
    async handle(req: Request, res: Response) {
        const { 
            razao_social,
            observation
        } = req.body

        let userId = req.userId
        
        const createCompanyService = new CreateCompanyService

        const company = await createCompanyService.execute({
            razao_social,
            observation,
            userId
        })

        return res.json(company)
    }
}

export { CreateCompanyController } 