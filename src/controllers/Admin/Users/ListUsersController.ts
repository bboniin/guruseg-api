import { Request, Response } from 'express';
import { ListUsersService } from '../../../services/Admin/Users/ListUsersService';

class ListUsersController {
    async handle(req: Request, res: Response) {


        let userId = req.userId

        const listUsersService = new ListUsersService

        const users = await listUsersService.execute({
            userId
        })

        users.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(users)
    }
}

export { ListUsersController }