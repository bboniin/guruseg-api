import { Request, Response } from 'express';
import { ListServicesAdminService } from '../../services/Service/ListServicesAdminService';

class ListServicesAdminController {
    async handle(req: Request, res: Response) {

        const listServicesAdminService = new ListServicesAdminService

        const services = await listServicesAdminService.execute( )

        return res.json(services)
    }
}

export { ListServicesAdminController }