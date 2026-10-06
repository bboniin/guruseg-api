import { Request, Response } from "express";
import { ListUsersCollaboratorService } from "../../../services/Admin/Collaborators/ListUsersCollaboratorService";

class ListUsersCollaboratorController {
  async handle(req: Request, res: Response) {
    let { collaborator_id } = req.params;

    let userId = req.userId;

    const listUsersCollaboratorService = new ListUsersCollaboratorService();

    const collaborators = await listUsersCollaboratorService.execute({
      userId,
      collaborator_id,
    });

    return res.json(collaborators);
  }
}

export { ListUsersCollaboratorController };
