import { Request, Response } from "express";
import { CreateAdminService } from "../../../services/Admin/Admins/CreateAdminService";

class CreateAdminController {
  async handle(req: Request, res: Response) {
    const { name, email, password, access_granted, enabled } = req.body;

    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }
    let userId = req.userId;

    const createAdminService = new CreateAdminService();

    const admin = await createAdminService.execute({
      name,
      email,
      access_granted,
      password,
      photo,
      userId,
    });

    return res.json(admin);
  }
}

export { CreateAdminController };
