import { Request, Response } from 'express';
import { CreateImageCompanyService } from '../../services/Company/CreateImageCompanyService';

class CreateImageCompanyController {
    async handle(req: Request, res: Response) {
        const { company_id } = req.params
        const { index } = req.body

        let file = ""
        if (req.file) {
            file = req.file.filename
        }

        const createImageCompanyService = new CreateImageCompanyService

        const image = await createImageCompanyService.execute({
            company_id, index: parseInt(index) || 0, file
        })

        image["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + image.photo;

        return res.json(image)
    }
}

export { CreateImageCompanyController } 