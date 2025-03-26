import { Request, Response } from 'express';
import { PasswordForgotService } from '../../services/User/PasswordForgotService';

class PasswordForgotController {
    async handle(req: Request, res: Response) {
        const { email } = req.body

        const passwordForgotService = new PasswordForgotService

        const message = await passwordForgotService.execute({
            email
        })

        return res.json(message)
    }
}

export { PasswordForgotController }