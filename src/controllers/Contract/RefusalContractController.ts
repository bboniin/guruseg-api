import { Request, Response } from 'express';
import { RefusalContractService } from '../../services/Contract/RefusalContractService';

class RefusalContractController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const refusalContractService = new RefusalContractService

        const services = await refusalContractService.execute({
            id
        })

        return res.json(services)
    }
}

export { RefusalContractController }