import { Request, Response } from 'express';
import { GetCollaboratorService } from '../../services/Collaborator/GetCollaboratorService';

class GetCollaboratorController {
    async handle(req: Request, res: Response) {


        let userId = req.userId

        const getCollaboratorService = new GetCollaboratorService

        const collaborator = await getCollaboratorService.execute({
            userId
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