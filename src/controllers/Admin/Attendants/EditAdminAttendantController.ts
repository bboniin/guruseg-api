import { Request, Response } from "express";
import { EditAdminAttendantService } from "../../../services/Admin/Attendants/EditAdminAttendantService";

class EditAdminAttendantController {
  async handle(req: Request, res: Response) {
    const { name, email, password, enabled } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editAdminAttendantService = new EditAdminAttendantService();

    const attendant = await editAdminAttendantService.execute({
      name,
      email,
      photo,
      password,
      id,
      enabled: enabled == "true" ? true : false,
    });

    if (attendant["photo"]) {
      attendant["photo_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + attendant["photo"];
    }

    return res.json(attendant);
  }
}

export { EditAdminAttendantController };
