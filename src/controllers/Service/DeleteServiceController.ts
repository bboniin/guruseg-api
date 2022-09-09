import { Request, Response} from 'express';
import { DeleteServiceService } from '../../services/Service/DeleteServiceService';

class DeleteServiceController{
    async handle(req: Request, res: Response){
        const { id } = req.params

        const deleteServiceService = new DeleteServiceService

        const service = await deleteServiceService.execute({
            id
        })
        
        return res.json(service)
    }
}

export { DeleteServiceController }