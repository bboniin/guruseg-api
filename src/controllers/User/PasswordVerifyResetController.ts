import { Request, Response } from 'express';
import { PasswordVerifyResetService } from '../../services/User/PasswordVerifyResetService';

class PasswordVerifyResetController {
    async handle(req: Request, res: Response) {
        const { code } = req.params

        const passwordVerifyResetService = new PasswordVerifyResetService

        const message = await passwordVerifyResetService.execute({
            code
        })

        return res.json(message)
    }
}

export { PasswordVerifyResetController }