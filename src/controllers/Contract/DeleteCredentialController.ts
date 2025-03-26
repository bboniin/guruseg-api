import { Request, Response } from 'express';
import { DeleteContractService } from '../../services/Contract/DeleteContractService';

class DeleteContractController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteContractService = new DeleteContractService

        const contract = await deleteContractService.execute({
            id
        })

        return res.json(contract)
    }
}

export { DeleteContractController }