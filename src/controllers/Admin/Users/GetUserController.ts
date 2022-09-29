import { Request, Response } from 'express';
import { GetUserService } from '../../../services/Admin/Users/GetUserService';

class GetUserController {
    async handle(req: Request, res: Response) {


        const { id } = req.params

        const getUserService = new GetUserService

        const user = await getUserService.execute({
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

export { GetUserController }