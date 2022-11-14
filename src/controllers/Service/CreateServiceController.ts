import { Request, Response } from 'express';
import { CreateServiceService } from '../../services/Service/CreateServiceService';

class CreateServiceController {
    async handle(req: Request, res: Response) {
        const { name, description, value, commission, sector } = req.body

        const createServiceService = new CreateServiceService

        const service = await createServiceService.execute({
            name, description, value, commission, sector
        })

        return res.json(service)
    }
}

export { CreateServiceController }