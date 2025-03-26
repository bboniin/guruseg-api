import { Request, Response } from 'express';
import { ListBannersService } from '../../../services/Admin/Banners/ListBannersService';

class ListBannersController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listBannersService = new ListBannersService

        const banners = await listBannersService.execute({
            userId
        })

        banners.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(banners)
    }
}

export { ListBannersController }