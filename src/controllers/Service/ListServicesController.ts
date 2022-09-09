import { Request, Response } from 'express';
import { ListServicesService } from '../../services/Service/ListServicesService';

class ListServicesController {
    async handle(req: Request, res: Response) {


        let userId = req.userId

        const listServicesService = new ListServicesService

        const services = await listServicesService.execute({
            userId
        })

        return res.json(services)
    }
}

export { ListServicesController }