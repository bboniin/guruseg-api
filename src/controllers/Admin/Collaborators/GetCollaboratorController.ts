import { Request, Response } from 'express';
import { GetCollaboratorService } from '../../../services/Admin/Collaborators/GetCollaboratorService';

class GetCollaboratorController {
    async handle(req: Request, res: Response) {


        const { id } = req.params

        const getCollaboratorService = new GetCollaboratorService

        const collaborator = await getCollaboratorService.execute({
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

export { GetCollaboratorController }