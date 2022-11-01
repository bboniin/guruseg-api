import { Request, Response } from 'express';
import { AdminListContractsService } from '../../services/Contract/AdminListContractsService';

class AdminListContractsController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.params

        let userId = req.userId

        const adminListContractsService = new AdminListContractsService

        const orders = await adminListContractsService.execute({
            user_id, userId
        })

        return res.json(orders)
    }
}

export { AdminListContractsController }