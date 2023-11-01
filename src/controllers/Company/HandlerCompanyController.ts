import { Request, Response } from 'express';
import { HandlerCompanyService } from '../../services/Company/HandlerCompanyService';

class HandlerCompanyController {
    async handle(req: Request, res: Response) {

        const { company_id } = req.params
        const { observation } = req.body

        let userId = req.userId

        const handlerCompanyService = new HandlerCompanyService

        const services = await handlerCompanyService.execute({
            userId, company_id, observation
        })


        return res.json(services)
    }
}

export { HandlerCompanyController }