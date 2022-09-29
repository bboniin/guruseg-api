import { Request, Response } from 'express';
import { DeleteUserService } from '../../../services/Admin/Users/DeleteUserService';

class DeleteUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteUserService = new DeleteUserService

        const user = await deleteUserService.execute({
            id
        })

        return res.json(user)
    }
}

export { DeleteUserController }