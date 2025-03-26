import { Request, Response } from 'express';
import { DeleteEmployeService } from '../../services/Company/DeleteEmployeService';

class DeleteEmployeController {
    async handle(req: Request, res: Response) {
        const { employe_id } = req.params

        let userId = req.userId

        const deleteEmployeService = new DeleteEmployeService

        const image = await deleteEmployeService.execute({
            employe_id, userId
        })

        return res.json(image)
    }
}

export { DeleteEmployeController }