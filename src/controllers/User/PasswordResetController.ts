import { Request, Response } from 'express';
import { PasswordResetService } from '../../services/User/PasswordResetService';

class PasswordResetController {
    async handle(req: Request, res: Response) {
        const { code } = req.params
        const { password } = req.body

        const passwordResetService = new PasswordResetService

        const message = await passwordResetService.execute({
            code, password
        })

        return res.json(message)
    }
}

export { PasswordResetController }