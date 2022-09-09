import { Request, Response } from 'express';
import { AuthAdminService } from '../../services/Admin/AuthAdminService';

class AuthAdminController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authAdminService = new AuthAdminService

        const admin = await authAdminService.execute({
            email, password
        })

        return res.json(admin)
    }
}

export { AuthAdminController }