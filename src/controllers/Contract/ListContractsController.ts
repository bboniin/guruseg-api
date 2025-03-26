import { Request, Response } from 'express';
import { ListContractsService } from '../../services/Contract/ListContractsService';

class ListContractsController {
    async handle(req: Request, res: Response) {

        const { lead_id } = req.query

        let userId = req.userId

        const listContractsService = new ListContractsService

        const contracts = await listContractsService.execute({
            userId, lead_id: lead_id ? String(lead_id) : ""
        })

        return res.json(contracts)
    }
}

export { ListContractsController }