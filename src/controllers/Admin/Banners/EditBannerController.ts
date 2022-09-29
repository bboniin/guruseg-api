import { Request, Response } from 'express';
import { EditBannerService } from '../../../services/Admin/Banners/EditBannerService';

class EditBannerController {
    async handle(req: Request, res: Response) {
        const { url } = req.body

        const { id } = req.params

        let userId = req.userId

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editBannerService = new EditBannerService

        const banner = await editBannerService.execute({
            url, photo, id, userId
        })

        if (banner["photo"]) {
            banner["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + banner["photo"];
        }

        return res.json(banner)
    }
}

export { EditBannerController }