import { Request, Response } from 'express';
import { EndNegotiationContractService } from '../../services/Contract/EndNegotiationContractService';

class EndNegotiationContractController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId

        const endNegotiationContractService = new EndNegotiationContractService

        const services = await endNegotiationContractService.execute({
            id, userId
        })

        return res.json(services)
    }
}

export { EndNegotiationContractController }