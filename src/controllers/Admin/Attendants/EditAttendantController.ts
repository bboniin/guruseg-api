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

    const editAttendantService = new EditAttendantService();

    const attendant = await editAttendantService.execute({
      name,
      email,
      photo,
      password,
      id,
      enabled: enabled == "true" ? true : false,
    });

    return res.json(attendant);
  }
}

export { EditAttendantController };
