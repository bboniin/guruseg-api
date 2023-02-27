import { Request, Response } from 'express';
import { CreateBannerService } from '../../../services/Admin/Banners/CreateBannerService';

class CreateBannerController {
    async handle(req: Request, res: Response) {
        const { url, types } = req.body

        let photo = ""

        let userId = req.userId

        if (req.file) {
            photo = req.file.filename
        }

        const createBannerService = new CreateBannerService

        const banner = await createBannerService.execute({
            userId, url, types, photo
        })

        return res.json(banner)
    }
}

export { CreateBannerController }