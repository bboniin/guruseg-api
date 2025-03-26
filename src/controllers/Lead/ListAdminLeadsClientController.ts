import { Request, Response } from 'express';
import { ListLeadsClientService } from '../../services/Lead/ListLeadsClientService';

class ListAdminLeadsClientController {
    async handle(req: Request, res: Response) {

        let { userId } = req.params

        const listLeadsClientService = new ListLeadsClientService

        const leads = await listLeadsClientService.execute({
            userId
        })

        return res.json(leads)
    }
}

export { ListAdminLeadsClientController }