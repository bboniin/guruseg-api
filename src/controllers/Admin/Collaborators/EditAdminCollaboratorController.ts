import { Request, Response } from 'express';
import { EditAdminCollaboratorService } from '../../../services/Admin/Collaborators/EditAdminCollaboratorService';

class EditAdminCollaboratorController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, password, sector, enabled } = req.body

        const { id } = req.params

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editAdminCollaboratorService = new EditAdminCollaboratorService

        const collaborator = await editAdminCollaboratorService.execute({
            name, email, phone_number, photo, password, id, sector, enabled: enabled == "true" ? true : false
        })

        if (collaborator["photo"]) {
            collaborator["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator["photo"];
        }

        return res.json(collaborator)
    }
}

export { EditAdminCollaboratorController }