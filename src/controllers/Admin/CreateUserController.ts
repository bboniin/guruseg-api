import { Request, Response } from 'express';
import { CreateUserService } from '../../services/Admin/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, phone_number } = req.body

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createUserService = new CreateUserService

        const user = await createUserService.execute({
            name, email, phone_number, password, photo
        })

        return res.json(user)
    }
}

export { CreateUserController }