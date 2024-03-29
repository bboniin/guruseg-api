import { Request, Response } from 'express';
import { DeleteCompanyService } from '../../services/Company/DeleteCompanyService';

class DeleteCompanyController {
    async handle(req: Request, res: Response) {
        const { company_id } = req.params

        let userId = req.userId

        const deleteCompanyService = new DeleteCompanyService

        const image = await deleteCompanyService.execute({
            company_id, userId
        })

        return res.json(image)
    }
}

export { DeleteCompanyController }