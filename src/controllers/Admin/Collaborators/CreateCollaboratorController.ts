import { Request, Response } from 'express';
import { CreateCollaboratorService } from '../../../services/Admin/Collaborators/CreateCollaboratorService';

class CreateCollaboratorController {
    async handle(req: Request, res: Response) {
        const { name, email, password, phone_number, sector, enabled } = req.body

        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        const createCollaboratorService = new CreateCollaboratorService

        const collaborator = await createCollaboratorService.execute({
            name, email, phone_number, password, photo, sector, enabled: enabled == "true" ? true : false
        })

        return res.json(collaborator)
    }
}

export { CreateCollaboratorController }