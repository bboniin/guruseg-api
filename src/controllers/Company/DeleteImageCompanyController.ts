import { Request, Response } from 'express';
import { DeleteImageCompanyService } from '../../services/Company/DeleteImageCompanyService';

class DeleteImageCompanyController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteImageCompanyService = new DeleteImageCompanyService

        const image = await deleteImageCompanyService.execute({
            id
        })

        return res.json(image)
    }
}

export { DeleteImageCompanyController }