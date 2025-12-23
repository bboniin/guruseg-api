import { Request, Response } from "express";
import { DeleteAttendantService } from "../../../services/Admin/Attendants/DeleteAttendantService";

class DeleteAttendantController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deleteAttendantService = new DeleteAttendantService();

    const attendant = await deleteAttendantService.execute({
      id,
      userId,
    });

    return res.json(attendant);
  }
}

export { DeleteAttendantController };
