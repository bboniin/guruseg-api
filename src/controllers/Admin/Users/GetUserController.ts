import { Request, Response } from 'express';
import { GetUserAdminService } from '../../../services/Admin/Users/GetUserAdminService';

class GetUserAdminController {
    async handle(req: Request, res: Response) {


        const { id } = req.params

        const getUserAdminService = new GetUserAdminService

        const user = await getUserAdminService.execute({
            id
        })
        if (user) {
            if (user["photo"]) {
                user["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
            }
        }

        return res.json(user)
    }
}

export { GetUserAdminController }