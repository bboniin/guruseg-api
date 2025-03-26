import { Request, Response } from 'express';
import { GetContractService } from '../../services/Contract/GetContractService';

class GetContractController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const getContractService = new GetContractService

        const contract = await getContractService.execute({
            id
        })
        return res.json(contract)
    }
}

export { GetContractController }