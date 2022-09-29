import { Request, Response } from 'express';
import { DeleteBannerService } from '../../../services/Admin/Banners/DeleteBannerService';

class DeleteBannerController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const deleteBannerService = new DeleteBannerService

        const banner = await deleteBannerService.execute({
            id, userId
        })

        return res.json(banner)
    }
}

export { DeleteBannerController }