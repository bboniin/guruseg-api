import { Request, Response } from 'express';
import { ServiceOSUserService } from '../../../services/Admin/Users/ServiceOSUserService';

class ServiceOSUserController {
    async handle(req: Request, res: Response) {

        const { id } = req.params
        const { start_date, service, end_date } = req.body

        const serviceOSUserService = new ServiceOSUserService

        const servicoOS = await serviceOSUserService.execute({
            id, start_date, service, end_date
        })

        return res.json(servicoOS)
    }
}

export { ServiceOSUserController }