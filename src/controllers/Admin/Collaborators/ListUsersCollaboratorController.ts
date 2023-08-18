import { Request, Response } from 'express';
import { ListUsersCollaboratorService } from '../../../services/Admin/Collaborators/ListUsersCollaboratorService';

class ListUsersCollaboratorController {
    async handle(req: Request, res: Response) {

        let { collaborator_id } = req.params

        let userId = req.userId

        const listUsersCollaboratorService = new ListUsersCollaboratorService

        const collaborators = await listUsersCollaboratorService.execute({
            userId, collaborator_id
        })

        collaborators.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(collaborators)
    }
}

export { ListUsersCollaboratorController }