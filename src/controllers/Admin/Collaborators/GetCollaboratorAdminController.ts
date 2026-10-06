import { Request, Response } from "express";
import { GetCollaboratorAdminService } from "../../../services/Admin/Collaborators/GetCollaboratorAdminService";

class GetCollaboratorAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getCollaboratorAdminService = new GetCollaboratorAdminService();

    const collaborator = await getCollaboratorAdminService.execute({
      id,
    });

    return res.json(collaborator);
  }
}

export { GetCollaboratorAdminController };
