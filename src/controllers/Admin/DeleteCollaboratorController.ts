import { Request, Response } from 'express';
import { DeleteCollaboratorService } from '../../services/Admin/DeleteCollaboratorService';

class DeleteCollaboratorController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteCollaboratorService = new DeleteCollaboratorService

        const collaborator = await deleteCollaboratorService.execute({
            id
        })

        return res.json(collaborator)
    }
}

export { DeleteCollaboratorController }