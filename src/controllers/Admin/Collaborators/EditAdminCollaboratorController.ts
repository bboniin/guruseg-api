import { Request, Response } from "express";
import { EditAdminCollaboratorService } from "../../../services/Admin/Collaborators/EditAdminCollaboratorService";

class EditAdminCollaboratorController {
  async handle(req: Request, res: Response) {
    const { name, email, phone_number, user_id, password, sector, enabled } =
      req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editAdminCollaboratorService = new EditAdminCollaboratorService();

    const collaborator = await editAdminCollaboratorService.execute({
      name,
      email,
      phone_number,
      photo,
      user_id,
      password,
      id,
      sector,
      enabled: enabled == "true" ? true : false,
    });

    return res.json(collaborator);
  }
}

export { EditAdminCollaboratorController };
