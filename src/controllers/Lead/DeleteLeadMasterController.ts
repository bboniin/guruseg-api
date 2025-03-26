import { Request, Response} from 'express';
import { DeleteLeadMasterService } from '../../services/Lead/DeleteLeadMasterService';

class DeleteLeadMasterController{
    async handle(req: Request, res: Response){
        const { id } = req.params

        const deleteLeadMasterService = new DeleteLeadMasterService

        const lead = await deleteLeadMasterService.execute({
            id
        })
        
        return res.json(lead)
    }
}

export { DeleteLeadMasterController }