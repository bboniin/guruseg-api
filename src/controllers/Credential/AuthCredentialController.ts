import { Request, Response } from 'express';
import { AuthCredentialService } from '../../services/Credential/AuthCredentialService';

class AuthCredentialController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authCredentialService = new AuthCredentialService

        const credential = await authCredentialService.execute({
            email, password
        })

        return res.json(credential)
    }
}

export { AuthCredentialController }