import { Request, Response } from "express";
import { CreateAttendantService } from "../../../services/Admin/Attendants/CreateAttendantService";

class CreateAttendantController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }

    let userId = req.userId;

    const createAttendantService = new CreateAttendantService();

    const attendant = await createAttendantService.execute({
      name,
      email,
      password,
      photo,
      userId,
    });

    return res.json(attendant);
  }
}

export { CreateAttendantController };
