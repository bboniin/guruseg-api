import { Request, Response } from 'express';
import { ListCredentialsService } from '../../services/Credential/ListCredentialsService';

class ListCredentialsController {
    async handle(req: Request, res: Response) {

        const listCredentialsService = new ListCredentialsService

        const credentials = await listCredentialsService.execute()

        credentials.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(credentials)
    }
}

export { ListCredentialsController }