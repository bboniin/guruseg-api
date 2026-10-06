import { Request, Response } from "express";
import { EditAdminService } from "../../../services/Admin/Admins/EditAdminService";

class EditAdminController {
  async handle(req: Request, res: Response) {
    const { name, email, password, access_granted, enabled } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let userId = req.userId;

    const editAdminService = new EditAdminService();

    const admin = await editAdminService.execute({
      name,
      email,
      photo,
      password,
      access_granted,
      userId,
      id,
    });

    return res.json(admin);
  }
}

export { EditAdminController };
