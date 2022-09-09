import { Request, Response } from 'express';
import { AuthCollaboratorService } from '../../services/Collaborator/AuthCollaboratorService';

class AuthCollaboratorController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authCollaboratorService = new AuthCollaboratorService

        const collaborator = await authCollaboratorService.execute({
            email, password
        })

        return res.json(collaborator)
    }
}

export { AuthCollaboratorController }