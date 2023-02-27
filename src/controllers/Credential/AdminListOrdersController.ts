import { Request, Response } from 'express';
import { AdminListCredentialsService } from '../../services/Credential/AdminListCredentialsService';

class AdminListCredentialsController {
    async handle(req: Request, res: Response) {


        const adminListCredentialsService = new AdminListCredentialsService

        const credentials = await adminListCredentialsService.execute({})

        credentials.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(credentials)
    }
}

export { AdminListCredentialsController }