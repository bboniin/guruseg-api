import { Request, Response } from 'express';
import { CreateUserService } from '../../../services/Admin/Users/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, phone_number, resale, course } = req.body

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let courseBoolean = course == "true" ? true : false
        let resaleBoolean = resale == "true" ? true : false

        const createUserService = new CreateUserService

        const user = await createUserService.execute({
            name, email, phone_number, password, photo, courseBoolean, resaleBoolean
        })

        return res.json(user)
    }
}

export { CreateUserController }