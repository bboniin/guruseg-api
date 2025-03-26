import { Request, Response } from 'express';
import { GetCollaboratorAdminService } from '../../../services/Admin/Collaborators/GetCollaboratorAdminService';

class GetCollaboratorAdminController {
    async handle(req: Request, res: Response) {


        const { id } = req.params

        const getCollaboratorAdminService = new GetCollaboratorAdminService

        const collaborator = await getCollaboratorAdminService.execute({
            id
        })
        if (collaborator) {
            if (collaborator["photo"]) {
                collaborator["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + collaborator["photo"];
            }
        }


        return res.json(collaborator)
    }
}

export { GetCollaboratorAdminController }