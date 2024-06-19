import { Request, Response } from 'express';
import { AdminListCredentialsService } from '../../services/Credential/AdminListCredentialsService';

class AdminListCredentialsController {
    async handle(req: Request, res: Response) {

        let { page, filter } = req.query

        const adminListCredentialsService = new AdminListCredentialsService

        const credentials = await adminListCredentialsService.execute({
            filter: filter ? String(filter) : "", page: Number(page) > 0 ? Number(page) : 0
        })

        credentials.credentials.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(credentials)
    }
}

export { AdminListCredentialsController }