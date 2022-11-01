import { Request, Response } from 'express';
import { ListContractsService } from '../../services/Contract/ListContractsService';

class ListContractsController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listContractsService = new ListContractsService

        const contracts = await listContractsService.execute({
            userId
        })

        return res.json(contracts)
    }
}

export { ListContractsController }