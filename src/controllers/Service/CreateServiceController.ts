import { Request, Response } from 'express';
import { CreateServiceService } from '../../services/Service/CreateServiceService';

class CreateServiceController {
    async handle(req: Request, res: Response) {
        const { name, description, value } = req.body

        const createServiceService = new CreateServiceService

        const service = await createServiceService.execute({
            name, description, value
        })

        return res.json(service)
    }
}

export { CreateServiceController }