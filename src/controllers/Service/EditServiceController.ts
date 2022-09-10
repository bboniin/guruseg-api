import { Request, Response } from 'express';
import { EditServiceService } from '../../services/Service/EditServiceService';

class EditServiceController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, description, value, commission } = req.body

        const editServiceService = new EditServiceService

        const service = await editServiceService.execute({
            name, id, description, value, commission
        })

        return res.json(service)
    }
}

export { EditServiceController } 