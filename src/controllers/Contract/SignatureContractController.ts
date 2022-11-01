import { Request, Response } from 'express';
import { SignatureContractService } from '../../services/Contract/SignatureContractService';

class SignatureContractController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const { signature } = req.body

        const signatureContractService = new SignatureContractService

        const services = await signatureContractService.execute({
            signature, id
        })


        return res.json(services)
    }
}

export { SignatureContractController }