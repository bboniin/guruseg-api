import { Request, Response } from 'express';
import { DeleteCredentialService } from '../../services/Credential/DeleteCredentialService';

class DeleteCredentialController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteCredentialService = new DeleteCredentialService

        const service = await deleteCredentialService.execute({
            id
        })

        return res.json(service)
    }
}

export { DeleteCredentialController }