import { Request, Response } from "express";
import { CreateAttendantService } from "../../../services/Admin/Attendants/CreateAttendantService";

class CreateAttendantController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone_number, user_id, sector, enabled } =
      req.body;

    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }

    const createAttendantService = new CreateAttendantService();

    const attendant = await createAttendantService.execute({
      name,
      email,
      phone_number,
      password,
      photo,
      user_id,
      sector,
      enabled: enabled == "true" ? true : false,
    });

    return res.json(attendant);
  }
}

export { CreateAttendantController };
