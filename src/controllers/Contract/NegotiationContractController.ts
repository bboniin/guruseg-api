import { Request, Response } from 'express';
import { NegotiationContractService } from '../../services/Contract/NegotiationContractService';

class NegotiationContractController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const negotiationContractService = new NegotiationContractService

        const services = await negotiationContractService.execute({
            id
        })

        return res.json(services)
    }
}

export { NegotiationContractController }