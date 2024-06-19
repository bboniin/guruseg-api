import { Request, Response } from 'express';
import { ListServicesClientService } from '../../services/Service/ListServicesClientService';

class ListServicesClientController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listServicesClientService = new ListServicesClientService

        const services = await listServicesClientService.execute({
            userId
        })

        return res.json(services)
    }
}

export { ListServicesClientController }