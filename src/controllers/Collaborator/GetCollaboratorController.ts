import { Request, Response } from "express";
import { GetCollaboratorService } from "../../services/Collaborator/GetCollaboratorService";

class GetCollaboratorController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const getCollaboratorService = new GetCollaboratorService();

    const collaborator = await getCollaboratorService.execute({
      userId,
    });

    return res.json(collaborator);
  }
}

export { GetCollaboratorController };
