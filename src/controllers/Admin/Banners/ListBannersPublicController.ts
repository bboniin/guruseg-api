import { Request, Response } from 'express';
import { ListBannersPublicService } from '../../../services/Admin/Banners/ListBannersPublicService';

class ListBannersPublicController {
    async handle(req: Request, res: Response) {
        const { type } = req.query

        const listBannersPublicService = new ListBannersPublicService

        const bannersPublic = await listBannersPublicService.execute({
            type: String(type)
        })

        bannersPublic.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(bannersPublic)
    }
}

export { ListBannersPublicController }