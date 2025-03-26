import { Request, Response } from 'express';
import { EditCollaboratorService } from '../../services/Collaborator/EditCollaboratorService';

class EditCollaboratorController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number } = req.body

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let collaboratorId = req.userId

        const editCollaboratorService = new EditCollaboratorService

        const collaborator = await editCollaboratorService.execute({
            name, email, phone_number, photo, collaboratorId
        })

        return res.json(collaborator)
    }
}

export { EditCollaboratorController }