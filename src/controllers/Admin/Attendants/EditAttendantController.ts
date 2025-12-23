import { Request, Response } from "express";
import { EditAttendantService } from "../../../services/Admin/Attendants/EditAttendantService";

class EditAttendantController {
  async handle(req: Request, res: Response) {
    const { name, email, password, enabled } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let userId = req.userId;

    const editAttendantService = new EditAttendantService();

    const attendant = await editAttendantService.execute({
      name,
      email,
      photo,
      password,
      id,
      enabled: enabled == "true" ? true : false,
      userId,
    });

    if (attendant["photo"]) {
      attendant["photo_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + attendant["photo"];
    }

    return res.json(attendant);
  }
}

export { EditAttendantController };
